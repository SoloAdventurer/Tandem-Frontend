
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { apiClient } from "../lib/api-client";
import type { SessionWSMessage, SessionWSResponse } from "../types/session";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface SessionContextType {
    status: ConnectionStatus;
    connect: () => Promise<void>;
    disconnect: () => void;
    sendMessage: (message: SessionWSMessage) => void;
    lastMessage: SessionWSResponse | null;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const useSessionSocket = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionSocket must be used within a SessionProvider");
    }
    return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [status, setStatus] = useState<ConnectionStatus>("disconnected");
    const socketRef = useRef<WebSocket | null>(null);
    const [lastMessage, setLastMessage] = useState<SessionWSResponse | null>(null);

    const connect = useCallback(async () => {
        if (socketRef.current?.readyState === WebSocket.OPEN) return;

        try {
            setStatus("connecting");

            // 1. Get Ticket
            const { data } = await apiClient.get<{ data: { ticket: string } }>("/session/ticket");
            const ticket = data.ticket;

            // 2. Open WebSocket
            const wsUrl = `ws://localhost:3000/api/session/ws?ticket=${ticket}`;
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                setStatus("connected");
                console.log("WebSocket connected");
            };

            ws.onmessage = (event) => {
                try {
                    const message: SessionWSResponse = JSON.parse(event.data);
                    setLastMessage(message);
                    console.log("WS Message:", message);
                } catch (e) {
                    console.error("Failed to parse WS message", event.data);
                }
            };

            ws.onerror = (e) => {
                console.error("WebSocket error", e);
                setStatus("error");
            };

            ws.onclose = () => {
                console.log("WebSocket closed");
                setStatus("disconnected");
                socketRef.current = null;
            };

            socketRef.current = ws;

        } catch (e) {
            console.error("Failed to connect to session socket", e);
            setStatus("error");
        }
    }, []);

    const sendMessage = useCallback((message: SessionWSMessage) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.warn("WebSocket not connected, cannot send message", message);
        }
    }, []);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        setStatus("disconnected");
        setLastMessage(null); // Clear stale message state
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <SessionContext.Provider value={{ status, connect, disconnect, sendMessage, lastMessage }}>
            {children}
        </SessionContext.Provider>
    );
};
