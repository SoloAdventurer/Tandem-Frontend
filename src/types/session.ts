
export type SessionWSMessage =
    | {
        type: "init_session";
        tasks: string[];
        focus_duration: string;
    }
    | {
        type: "toggle_task";
        task_id: string;
        is_complete: boolean;
    }
    | {
        type: "checkin_report";
        work_proved: boolean;
        reviewee_id: string;
    }
    | {
        type: "checkin_message";
        content: string;
        last_ordering?: number;
    }
    | {
        type: "self_checkin";
    };

export type SessionWSResponse =
    | {
        type: "error";
        error: string;
    }
    | {
        type: "terminated";
        reason?: string;
    }
    | {
        type: "matching_pending";
    }
    | {
        type: "other_user_disconnected";
        userId: string;
    }
    | {
        type: "other_user_reconnected";
        userId: string;
        tasks: string[];
    }
    | {
        type: "start_session";
        partners: {
            id: string;
            tasks: string[];
        }[];
        tasks: {
            title: string;
            task_id: string;
        }[];
        start_time: string;
        scheduled_duration: string;
    }
    | {
        type: "checkin_start";
    }
    | {
        type: "checkin_report_sent";
        work_proved: boolean;
        reviewer_id: string;
        reviewee_id: string;
    }
    | {
        type: "checkin_partner_message";
        content: string;
        from: string;
        lastOrdering: number;
    }
    | {
        type: "disconnected_permanantly";
        partner_id: string;
    }
    | {
        type: "session_done";
    }
    | {
        type: "session_data";
        session_status: "checkin" | "running";
        time_left?: string;
        partners: {
            id: string;
            tasks: string[];
        }[];
        tasks: {
            title: string;
            task_id: string;
        }[];
        start_time: string;
    }
    | { type: "already_in_session" }
    | { type: "self_checkin_refused" }
    | { type: "self_checkin_done" };
