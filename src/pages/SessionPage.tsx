
import React, { useEffect, useState, useRef } from "react";
import { useSessionSocket } from "../providers/SessionProvider";
import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";

interface SessionPageProps {
    onNavigate: (page: "home" | "analytics" | "start" | "session" | "profile") => void;
}

const SessionPage: React.FC<SessionPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const { status, lastMessage, sendMessage, disconnect } = useSessionSocket();
    const [sessionState, setSessionState] = useState<"matching" | "running" | "checkin" | "init">("init");
    const [partner, setPartner] = useState<{ id: string; tasks: string[] } | null>(null);
    const [myTasks, setMyTasks] = useState<{ title: string; task_id: string; is_complete: boolean }[]>([]);
    const processedMessageRef = useRef<string | null>(null);

    const FACTS = [
        t("facts.1", "Powered by Hono & Bun for ultra-low latency"),
        t("facts.2", "Uses Drizzle ORM for type-safe database queries"),
        t("facts.3", "Real-time matching via WebSockets"),
        t("facts.4", "Frontend built with React, Vite & Tailwind v4"),
        t("facts.5", "Secure session management with Better Auth"),
        t("facts.6", "PostgreSQL ensures your data is safe"),
    ];

    const [waitingSeconds, setWaitingSeconds] = useState(0);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    // Timer and Fact rotation effects
    useEffect(() => {
        if (sessionState !== "matching") {
            setWaitingSeconds(0);
            return;
        }

        const timerInterval = setInterval(() => {
            setWaitingSeconds((prev) => prev + 1);
        }, 1000);

        const factInterval = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % FACTS.length);
        }, 5000);

        return () => {
            clearInterval(timerInterval);
            clearInterval(factInterval);
        };
    }, [sessionState]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Listen for socket messages
    useEffect(() => {
        if (!lastMessage) return;

        // Create a simple ID for this message to avoid reprocessing
        const messageId = JSON.stringify(lastMessage);
        if (processedMessageRef.current === messageId) return;
        processedMessageRef.current = messageId;

        switch (lastMessage.type) {
            case "matching_pending":
                setSessionState("matching");
                break;
            case "start_session":
                setSessionState("running");
                setPartner({
                    id: lastMessage.partners[0].id,
                    tasks: lastMessage.partners[0].tasks
                });
                setMyTasks(lastMessage.tasks.map(t => ({ ...t, is_complete: false })));
                break;
            case "session_data":
                setSessionState(lastMessage.session_status);
                setPartner({
                    id: lastMessage.partners[0].id,
                    tasks: lastMessage.partners[0].tasks
                });
                setMyTasks(lastMessage.tasks.map(t => ({ ...t, is_complete: false })));
                break;
        }
    }, [lastMessage]);

    // Reset ref on unmount to prevent stale comparisons
    useEffect(() => {
        return () => {
            processedMessageRef.current = null;
        };
    }, []);

    const handleLeave = () => {
        // Skip confirmation if just in matching state (nothing to lose)
        if (sessionState === "matching") {
            disconnect();
            onNavigate("home");
            return;
        }
        // For active sessions, require confirmation
        if (confirm(t("session.leave_confirm", "Are you sure you want to leave the session?"))) {
            disconnect();
            onNavigate("home");
        }
    };
    // If no session and not connected (user navigated here directly), redirect to start page
    if (sessionState === "init" && status === "disconnected") {
        onNavigate("start");
        return null;
    }

  

    // Show matching modal when:
    // - init + connected (waiting for backend to confirm matching)
    // - matching (actively waiting for a partner)
    if ((sessionState === "init" && status === "connected") || sessionState === "matching") {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {/* Modal Card */}
                    <div
                        className="relative max-w-md w-full text-center rounded-2xl p-8 shadow-2xl"
                        style={{
                            backgroundColor: "var(--bg-tertiary)",
                            border: "1px solid var(--border-primary)",
                        }}
                    >
                        {/* Spinner */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                                    style={{ backgroundColor: "var(--accent)" }}
                                ></div>
                                <div
                                    className="relative rounded-full p-4 border-2"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        borderColor: "var(--accent)"
                                    }}
                                >
                                    <div
                                        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
                                        style={{ borderColor: "var(--accent)" }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {t("session.matching.title", "Finding a Partner")}
                        </h2>

                        {/* Timer */}
                        <div
                            className="text-4xl font-mono font-bold mb-6"
                            style={{ color: "var(--accent)" }}
                        >
                            {formatTime(waitingSeconds)}
                        </div>

                        {/* Fact Card */}
                        <div
                            className="rounded-lg p-4 mb-6"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-primary)"
                            }}
                        >
                            <p
                                className="text-xs uppercase tracking-wider mb-2 font-semibold"
                                style={{ color: "var(--text-tertiary)" }}
                            >
                                {t("session.matching.didYouKnow", "Did you know?")}
                            </p>
                            <p
                                className="text-sm font-medium min-h-[2.5rem] flex items-center justify-center"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {FACTS[currentFactIndex]}
                            </p>
                        </div>

                        {/* Subtitle */}
                        <p
                            className="text-sm mb-8"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {t("session.matching.desc", "We're looking for someone with similar goals...")}
                        </p>

                        {/* Cancel Button */}
                        <button
                            onClick={handleLeave}
                            className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-80"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border-primary)",
                            }}
                        >
                            {t("common.cancel", "Cancel Search")}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-20 h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {sessionState === "checkin" ? "Check-in Phase" : "Focus Session"}
                </h1>
                <Button variant="secondary" size="sm" onClick={handleLeave}>{t("session.leave", "Leave Session")}</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* My Section */}
                <div className="rounded-xl p-6 flex flex-col" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>My Tasks</h2>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {myTasks.map(task => (
                            <div key={task.task_id} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                                <input
                                    type="checkbox"
                                    checked={task.is_complete}
                                    onChange={() => {
                                        const newVal = !task.is_complete;
                                        setMyTasks(prev => prev.map(t => t.task_id === task.task_id ? { ...t, is_complete: newVal } : t));
                                        sendMessage({
                                            type: "toggle_task",
                                            task_id: task.task_id,
                                            is_complete: newVal
                                        });
                                    }}
                                    className="mr-3 h-5 w-5"
                                />
                                <span style={{ color: "var(--text-primary)", textDecoration: task.is_complete ? "line-through" : "none" }}>{task.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Section */}
                <div className="rounded-xl p-6 flex flex-col" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Partner's Tasks</h2>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {partner?.tasks.map((task, i) => (
                            <div key={i} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                                <span style={{ color: "var(--text-primary)" }}>{task}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionPage;
