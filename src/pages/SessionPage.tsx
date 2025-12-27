import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSessionSocket } from "../providers/SessionProvider";
import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import { Clock, CheckCircle2, Circle, User, MessageSquare, AlertTriangle, Zap } from "lucide-react";

interface SessionPageProps {
    onNavigate: (page: "home" | "analytics" | "start" | "session" | "profile") => void;
}

interface Task {
    title: string;
    task_id: string;
    is_complete: boolean;
}

interface Partner {
    id: string;
    tasks: string[];
}

const SessionPage: React.FC<SessionPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const { status, lastMessage, sendMessage, disconnect } = useSessionSocket();
    
    // Session state
    const [sessionState, setSessionState] = useState<"matching" | "running" | "checkin" | "init">("init");
    const [partner, setPartner] = useState<Partner | null>(null);
    const [myTasks, setMyTasks] = useState<Task[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [scheduledDuration, setScheduledDuration] = useState<string>("00:25:00");
    const [partnerConnected, setPartnerConnected] = useState(true);
    
    // Checkin state
    const [checkinMessage, setCheckinMessage] = useState("");
    const [checkinMessages, setCheckinMessages] = useState<{from: string; content: string}[]>([]);
    const [hasReported, setHasReported] = useState(false);
    
    // Timer states
    const [waitingSeconds, setWaitingSeconds] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const processedMessageRef = useRef<string | null>(null);

    const FACTS = [
        t("facts.1", "Powered by Hono & Bun for ultra-low latency"),
        t("facts.2", "Uses Drizzle ORM for type-safe database queries"),
        t("facts.3", "Real-time matching via WebSockets"),
        t("facts.4", "Frontend built with React, Vite & Tailwind v4"),
        t("facts.5", "Secure session management with Better Auth"),
        t("facts.6", "PostgreSQL ensures your data is safe"),
    ];

    // Parse duration string (HH:MM:SS) to seconds
    const parseDuration = (duration: string): number => {
        const parts = duration.split(":").map(Number);
        return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    };

    // Format seconds to MM:SS or HH:MM:SS
    const formatTime = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    // Matching timer and fact rotation
    useEffect(() => {
        const shouldRunTimer = sessionState === "matching" || sessionState === "init";
        if (!shouldRunTimer) {
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

    // Session countdown timer
    useEffect(() => {
        if (sessionState !== "running" || !startTime) return;

        const durationSecs = parseDuration(scheduledDuration);
        const endTime = new Date(startTime.getTime() + durationSecs * 1000);

        const updateRemaining = () => {
            const now = new Date();
            const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
            setRemainingSeconds(remaining);
        };

        updateRemaining();
        const interval = setInterval(updateRemaining, 1000);

        return () => clearInterval(interval);
    }, [sessionState, startTime, scheduledDuration]);

    // Progress percentage for timer
    const progressPercent = useMemo(() => {
        if (!startTime || sessionState !== "running") return 0;
        const total = parseDuration(scheduledDuration);
        const elapsed = total - remainingSeconds;
        return Math.min(100, (elapsed / total) * 100);
    }, [remainingSeconds, scheduledDuration, startTime, sessionState]);

    // Listen for socket messages
    useEffect(() => {
        if (!lastMessage) return;

        const messageId = JSON.stringify(lastMessage);
        if (processedMessageRef.current === messageId) return;
        processedMessageRef.current = messageId;

        switch (lastMessage.type) {
            case "matching_pending":
                setSessionState("matching");
                break;
            case "start_session":
                setSessionState("running");
                setPartner(lastMessage.partners[0] || null);
                setMyTasks(lastMessage.tasks.map(t => ({ ...t, is_complete: false })));
                setStartTime(new Date(lastMessage.start_time));
                setScheduledDuration(lastMessage.scheduled_duration);
                setPartnerConnected(true);
                break;
            case "session_data":
                setSessionState(lastMessage.session_status);
                setPartner(lastMessage.partners[0] || null);
                setMyTasks(lastMessage.tasks.map(t => ({ ...t, is_complete: false })));
                setStartTime(new Date(lastMessage.start_time));
                setPartnerConnected(true);
                break;
            case "checkin_start":
                setSessionState("checkin");
                break;
            case "other_user_disconnected":
                setPartnerConnected(false);
                break;
            case "other_user_reconnected":
                setPartnerConnected(true);
                break;
            case "checkin_partner_message":
                setCheckinMessages(prev => [...prev, { from: lastMessage.from, content: lastMessage.content }]);
                break;
            case "session_done":
                onNavigate("home");
                break;
        }
    }, [lastMessage, onNavigate]);

    // Reset ref on unmount
    useEffect(() => {
        return () => {
            processedMessageRef.current = null;
        };
    }, []);

    const handleLeave = () => {
        if (sessionState === "matching" || sessionState === "init") {
            disconnect();
            onNavigate("home");
            return;
        }
        if (confirm(t("session.leave_confirm", "Are you sure you want to leave the session?"))) {
            disconnect();
            onNavigate("home");
        }
    };

    const handleToggleTask = (taskId: string) => {
        const task = myTasks.find(t => t.task_id === taskId);
        if (!task) return;
        const newVal = !task.is_complete;
        setMyTasks(prev => prev.map(t => t.task_id === taskId ? { ...t, is_complete: newVal } : t));
        sendMessage({ type: "toggle_task", task_id: taskId, is_complete: newVal });
    };

    const handleCheckinReport = (workProved: boolean) => {
        if (!partner) return;
        sendMessage({ type: "checkin_report", work_proved: workProved, reviewee_id: partner.id });
        setHasReported(true);
    };

    const handleSendMessage = () => {
        if (!checkinMessage.trim()) return;
        sendMessage({ type: "checkin_message", content: checkinMessage });
        setCheckinMessages(prev => [...prev, { from: "me", content: checkinMessage }]);
        setCheckinMessage("");
    };

    const handleSelfCheckin = () => {
        sendMessage({ type: "self_checkin" });
    };

    // Redirect if not connected
    if (sessionState === "init" && status === "disconnected") {
        onNavigate("start");
        return null;
    }

    // ==================== MATCHING UI ====================
    if ((sessionState === "init" && status === "connected") || sessionState === "matching") {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(8px)" }}
            >
                <div
                    className="relative max-w-md w-full text-center rounded-2xl p-8 shadow-2xl"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                >
                    {/* Animated Spinner */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div
                                className="absolute inset-0 rounded-full animate-ping opacity-20"
                                style={{ backgroundColor: "var(--accent)", width: 80, height: 80 }}
                            />
                            <div
                                className="relative rounded-full p-5 border-4"
                                style={{ backgroundColor: "var(--bg-tertiary)", borderColor: "var(--accent)" }}
                            >
                                <Zap className="h-8 w-8 animate-pulse" style={{ color: "var(--accent)" }} />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                        {t("session.matching.title", "Finding a Partner")}
                    </h2>

                    <div className="text-5xl font-mono font-bold mb-6" style={{ color: "var(--accent)" }}>
                        {formatTime(waitingSeconds)}
                    </div>

                    <div
                        className="rounded-lg p-4 mb-6"
                        style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-primary)" }}
                    >
                        <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: "var(--text-tertiary)" }}>
                            {t("session.matching.didYouKnow", "Did you know?")}
                        </p>
                        <p className="text-sm font-medium min-h-[2.5rem] flex items-center justify-center" style={{ color: "var(--text-primary)" }}>
                            {FACTS[currentFactIndex]}
                        </p>
                    </div>

                    <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                        {t("session.matching.desc", "We're looking for someone with similar goals...")}
                    </p>

                    <Button variant="secondary" onClick={handleLeave}>
                        {t("common.cancel", "Cancel Search")}
                    </Button>
                </div>
            </div>
        );
    }

    // ==================== RUNNING SESSION UI ====================
    if (sessionState === "running") {
        const completedCount = myTasks.filter(t => t.is_complete).length;

        return (
            <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 min-h-screen flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                            {t("session.focusSession", "Focus Session")}
                        </h1>
                        {!partnerConnected && (
                            <div className="flex items-center text-sm mt-1" style={{ color: "var(--warning)" }}>
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                {t("session.partnerDisconnected", "Partner disconnected")}
                            </div>
                        )}
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleLeave}>
                        {t("session.leave", "Leave Session")}
                    </Button>
                </header>

                {/* Timer Card */}
                <div
                    className="rounded-xl p-6 mb-6 flex flex-col items-center"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                >
                    <div className="relative w-48 h-48 mb-4">
                        <svg className="transform -rotate-90 w-48 h-48">
                            <circle
                                cx="96" cy="96" r="88"
                                stroke="var(--border-primary)" strokeWidth="8" fill="none"
                            />
                            <circle
                                cx="96" cy="96" r="88"
                                stroke="var(--accent)" strokeWidth="8" fill="none"
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - progressPercent / 100)}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Clock className="h-6 w-6 mb-2" style={{ color: "var(--text-tertiary)" }} />
                            <span className="text-4xl font-mono font-bold" style={{ color: "var(--text-primary)" }}>
                                {formatTime(remainingSeconds)}
                            </span>
                            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                {t("session.remaining", "remaining")}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                        {completedCount}/{myTasks.length} {t("session.tasksCompleted", "tasks completed")}
                    </div>
                </div>

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    {/* My Tasks */}
                    <div
                        className="rounded-xl p-6 flex flex-col"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: "var(--text-primary)" }}>
                            <CheckCircle2 className="h-5 w-5 mr-2" style={{ color: "var(--accent)" }} />
                            {t("session.myTasks", "My Tasks")}
                        </h2>
                        <div className="space-y-3 flex-1 overflow-y-auto">
                            {myTasks.map(task => (
                                <div
                                    key={task.task_id}
                                    className="flex items-center p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: task.is_complete ? "var(--success-bg)" : "var(--bg-tertiary)",
                                        border: `1px solid ${task.is_complete ? "var(--success)" : "var(--border-primary)"}`,
                                    }}
                                    onClick={() => handleToggleTask(task.task_id)}
                                >
                                    {task.is_complete ? (
                                        <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0" style={{ color: "var(--success)" }} />
                                    ) : (
                                        <Circle className="h-6 w-6 mr-3 flex-shrink-0" style={{ color: "var(--text-tertiary)" }} />
                                    )}
                                    <span
                                        className={`font-medium ${task.is_complete ? "line-through" : ""}`}
                                        style={{ color: task.is_complete ? "var(--text-tertiary)" : "var(--text-primary)" }}
                                    >
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partner's Tasks */}
                    <div
                        className="rounded-xl p-6 flex flex-col"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: "var(--text-primary)" }}>
                            <User className="h-5 w-5 mr-2" style={{ color: "var(--secondary-500)" }} />
                            {t("session.partnerTasks", "Partner's Tasks")}
                        </h2>
                        <div className="space-y-3 flex-1 overflow-y-auto">
                            {partner?.tasks.map((task, i) => (
                                <div
                                    key={i}
                                    className="flex items-center p-4 rounded-lg"
                                    style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-primary)" }}
                                >
                                    <Circle className="h-6 w-6 mr-3 flex-shrink-0" style={{ color: "var(--text-tertiary)" }} />
                                    <span style={{ color: "var(--text-primary)" }}>{task}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ==================== CHECKIN UI ====================
    if (sessionState === "checkin") {
        return (
            <div className="max-w-4xl mx-auto px-4 pt-6 pb-24 min-h-screen flex flex-col">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {t("session.checkin.title", "Check-in Phase")}
                    </h1>
                    <Button variant="secondary" size="sm" onClick={handleLeave}>
                        {t("session.leave", "Leave")}
                    </Button>
                </header>

                {/* Partner Review Card */}
                {!hasReported && partner && (
                    <div
                        className="rounded-xl p-6 mb-6"
                        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                    >
                        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                            {t("session.checkin.reviewPartner", "Did your partner complete their work?")}
                        </h2>
                        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            {t("session.checkin.reviewDesc", "Based on your interaction, did your partner demonstrate they completed their tasks?")}
                        </p>
                        <div className="flex gap-4">
                            <Button variant="primary" onClick={() => handleCheckinReport(true)}>
                                ✓ {t("session.checkin.yes", "Yes, they did!")}
                            </Button>
                            <Button variant="secondary" onClick={() => handleCheckinReport(false)}>
                                ✗ {t("session.checkin.no", "No, they didn't")}
                            </Button>
                        </div>
                    </div>
                )}

                {hasReported && (
                    <div
                        className="rounded-xl p-6 mb-6 text-center"
                        style={{ backgroundColor: "var(--success-bg)", border: "1px solid var(--success)" }}
                    >
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2" style={{ color: "var(--success)" }} />
                        <p className="font-medium" style={{ color: "var(--success)" }}>
                            {t("session.checkin.reported", "Your feedback has been submitted!")}
                        </p>
                    </div>
                )}

                {/* Chat Section */}
                <div
                    className="rounded-xl p-6 mb-6 flex-1 flex flex-col"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
                >
                    <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ color: "var(--text-primary)" }}>
                        <MessageSquare className="h-5 w-5 mr-2" />
                        {t("session.checkin.chat", "Chat with Partner")}
                    </h2>
                    <div
                        className="flex-1 overflow-y-auto space-y-2 mb-4 p-4 rounded-lg"
                        style={{ backgroundColor: "var(--bg-tertiary)", minHeight: 150 }}
                    >
                        {checkinMessages.length === 0 && (
                            <p className="text-sm text-center" style={{ color: "var(--text-tertiary)" }}>
                                {t("session.checkin.noMessages", "No messages yet. Say hi!")}
                            </p>
                        )}
                        {checkinMessages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg max-w-[80%] ${msg.from === "me" ? "ml-auto" : ""}`}
                                style={{
                                    backgroundColor: msg.from === "me" ? "var(--accent)" : "var(--bg-secondary)",
                                    color: msg.from === "me" ? "white" : "var(--text-primary)",
                                }}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={checkinMessage}
                            onChange={(e) => setCheckinMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder={t("session.checkin.messagePlaceholder", "Type a message...")}
                            className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: "var(--bg-tertiary)",
                                borderColor: "var(--border-primary)",
                                color: "var(--text-primary)",
                            }}
                        />
                        <Button variant="primary" onClick={handleSendMessage}>
                            {t("session.checkin.send", "Send")}
                        </Button>
                    </div>
                </div>

                {/* Self Checkin */}
                {!partnerConnected && (
                    <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: "var(--warning-bg)", border: "1px solid var(--warning)" }}
                    >
                        <h3 className="font-semibold mb-2" style={{ color: "var(--warning)" }}>
                            {t("session.checkin.partnerGone", "Partner not available?")}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            {t("session.checkin.selfCheckinDesc", "If your partner disconnected, you can self-checkin to complete the session.")}
                        </p>
                        <Button variant="secondary" onClick={handleSelfCheckin}>
                            {t("session.checkin.selfCheckin", "Self Check-in")}
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default SessionPage;
