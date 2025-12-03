"use client";

import { useEffect, useState } from "react";

type Props = {
  timezone?: string;
  hour12?: boolean;
  className?: string;
};

function useCurrentTime(timezone?: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [timezone]);

  return now;
}

export default function DigitalClock({
  timezone,
  hour12 = true,
  className = "",
}: Props) {
  const now = useCurrentTime(timezone);

  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12,
    timeZone: timezone,
  });

  const weekdayFmt = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    timeZone: timezone,
  });

  const dateFmt = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    timeZone: timezone,
  });

  const yearFmt = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    timeZone: timezone,
  });

  const timeStr = timeFmt.format(now);
  const weekdayStr = weekdayFmt.format(now);
  const dateStr = dateFmt.format(now);
  const yearStr = yearFmt.format(now);

  return (
    <div
      className={`
        w-full max-w-xl
        rounded-3xl p-6
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-2xl
        text-white
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div
            className="text-[3rem] sm:text-[4rem] leading-none font-black tracking-tight tabular-nums drop-shadow"
            aria-live="polite"
            aria-atomic="true"
          >
            {timeStr}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-200">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-medium">
              {weekdayStr}
            </span>

            <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10">
              {dateStr}
            </span>

            <span className="opacity-70">•</span>

            <span>{yearStr}</span>
          </div>
        </div>

        <div className="flex flex-col items-end text-right">
          {hour12 ? (
            <div className="text-sm font-semibold uppercase text-gray-300">
              {
                new Intl.DateTimeFormat(undefined, {
                  hour: "numeric",
                  hour12: true,
                  timeZone: timezone,
                })
                  .formatToParts(now)
                  .find((p) => p.type === "dayPeriod")?.value
              }
            </div>
          ) : null}

          {timezone ? (
            <div className="mt-2 text-xs text-gray-300">{timezone}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
