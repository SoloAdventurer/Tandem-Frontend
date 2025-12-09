import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";
import Card from "../ui/Card";
import RangeSwitcher from "./RangeSwitcher";
import type { RangeOption } from "./RangeSwitcher";

export interface CompletionPoint {
  date: string;
  completion: number;
  completedSessions: number;
  totalSessions: number;
}

interface CompletionLineChartProps {
  data: CompletionPoint[];
  title?: string;
  subtitle?: string;
  className?: string;
  rangeOptions?: RangeOption[];
  rangeValue?: string;
  onRangeChange?: (value: string) => void;
  isLoading?: boolean;
}

const percentFormatter = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
});

const CompletionLineChart: React.FC<CompletionLineChartProps> = ({
  data,
  title = "Completion Rate",
  subtitle = "Last 30 days",
  className = "",
  rangeOptions,
  rangeValue,
  onRangeChange,
  isLoading = false,
}) => {
  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [data]);

  if (!sortedData.length) {
    return (
      <Card className={`min-h-[260px] flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            No session data available yet.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`min-h-[320px] relative overflow-hidden ${className}`} hover>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 backdrop-blur-sm pointer-events-none">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Updating…
          </span>
        </div>
      )}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        </div>
        {rangeOptions && rangeOptions.length > 0 && rangeValue && onRangeChange && (
          <RangeSwitcher
            options={rangeOptions}
            value={rangeValue}
            onChange={onRangeChange}
          />
        )}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="completionArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border-primary)" opacity={0.4} />
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => dateFormatter.format(new Date(value))}
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={{ stroke: "var(--border-primary)", strokeWidth: 1 }}
              minTickGap={20}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value: number) => percentFormatter.format(value)}
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={{ stroke: "var(--border-primary)", strokeWidth: 1 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "var(--accent-primary)", opacity: 0.6 }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload as CompletionPoint;
                return (
                  <div
                    className="rounded-lg px-4 py-3 shadow-md"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {dateFormatter.format(new Date(label))}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {percentFormatter.format(point.completion)} completion
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                      {point.completedSessions}/{point.totalSessions} sessions
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="completion"
              stroke="none"
              fill="url(#completionArea)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="var(--accent-primary)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: "var(--bg-secondary)" }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CompletionLineChart;

