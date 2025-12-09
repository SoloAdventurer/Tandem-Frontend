import React, { useEffect, useMemo, useRef, useState } from "react";
import CompletionLineChart from "../components/analytics/CompletionLineChart";
import type { CompletionPoint } from "../components/analytics/CompletionLineChart";
import Button from "../components/ui/Button";

interface AnalyticsPageProps {
  onNavigate: (
    page: "home" | "analytics" | "start" | "session" | "profile"
  ) => void;
}

const createMockCompletionData = (days: number): CompletionPoint[] => {
  const today = new Date();

  return Array.from({ length: days }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - index - 1));

    const totalSessions = Math.max(1, Math.round(Math.random() * 3 + 1));
    const completedSessions = Math.max(
      0,
      Math.min(
        totalSessions,
        Math.round(totalSessions * (0.5 + Math.random() * 0.5))
      )
    );

    return {
      date: date.toISOString().split("T")[0],
      completion: completedSessions / totalSessions,
      completedSessions,
      totalSessions,
    };
  });
};

const RANGE_OPTIONS = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
] as const;

const getDaysFromRange = (range: (typeof RANGE_OPTIONS)[number]["value"]) => {
  switch (range) {
    case "7d":
      return 7;
    case "90d":
      return 90;
    case "30d":
    default:
      return 30;
  }
};

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onNavigate }) => {
  const [completionData, setCompletionData] = useState<CompletionPoint[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]["value"]>("30d");
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const isInitial = !hasLoadedRef.current;
    if (isInitial) {
      setIsInitialLoading(true);
    } else {
      setIsRefreshing(true);
    }

    const timeout = setTimeout(() => {
      if (cancelled) return;
      setCompletionData(createMockCompletionData(getDaysFromRange(range)));
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true;
        setIsInitialLoading(false);
      }
      setIsRefreshing(false);
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [range]);

  const averageCompletion = useMemo(() => {
    if (!completionData.length) return 0;
    const total = completionData.reduce(
      (sum, point) => sum + point.completion,
      0
    );
    return total / completionData.length;
  }, [completionData]);

  if (isInitialLoading) {
    return (
      <div
        className="min-h-[60vh] flex items-center justify-center text-lg font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-24">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Analytics
          </h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Track your focus consistency and spot trends in your sessions.
          </p>
        </div>
       
      </header>

      <section className="grid gap-6">
        <CompletionLineChart
          data={completionData}
          subtitle={`Average ${Math.round(averageCompletion * 100)}%`}
          rangeOptions={RANGE_OPTIONS}
          rangeValue={range}
          onRangeChange={setRange}
          isLoading={isRefreshing}
        />
      </section>
    </div>
  );
};

export default AnalyticsPage;

