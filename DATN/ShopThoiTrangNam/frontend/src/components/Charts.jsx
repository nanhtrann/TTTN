import React from 'react';
import { resolveImageUrl } from '../utils/imageUtils';

// Dữ liệu: [{ label, value }]
export function BarChart({ data = [], height = 220, color = '#3b82f6', formatValue = (v) => v }) {
    const max = Math.max(1, ...data.map((d) => Number(d.value) || 0));
    const barWidth = 100 / data.length;

    return (
        <div className="w-full">
            <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
                {data.map((item, idx) => {
                    const h = Math.max(2, (Number(item.value) || 0) / max * (height - 30));
                    return (
                        <div key={idx} className="group flex flex-col items-center justify-end flex-1 h-full">
                            <div className="text-[10px] text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                {formatValue(item.value)}
                            </div>
                            <div
                                title={`${item.label}: ${formatValue(item.value)}`}
                                className="w-full max-w-[46px] rounded-t-md transition-all duration-500 hover:opacity-80"
                                style={{ height: `${h}px`, background: color, minHeight: '3px' }}
                            />
                            <div className="text-[10px] text-slate-400 mt-2 truncate w-full text-center">{item.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Dữ liệu: [{ label, value }]
export function LineChart({ data = [], height = 220, color = '#22c55e', formatValue = (v) => v }) {
    const width = 300;
    const padding = { top: 20, right: 10, bottom: 28, left: 10 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const max = Math.max(1, ...data.map((d) => Number(d.value) || 0));
    const points = data.map((d, i) => {
        const x = padding.left + (i / Math.max(1, data.length - 1)) * chartW;
        const y = padding.top + chartH - (Number(d.value) || 0) / max * chartH;
        return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points.length ? points[points.length - 1].x : padding.left} ${padding.top + chartH} L ${points.length ? points[0].x : padding.left} ${padding.top + chartH} Z`;

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: `${height}px` }}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75, 1].map((f, i) => (
                    <line
                        key={i}
                        x1={padding.left}
                        x2={width - padding.right}
                        y1={padding.top + chartH * (1 - f)}
                        y2={padding.top + chartH * (1 - f)}
                        stroke="currentColor"
                        className="text-slate-200 dark:text-slate-700"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                ))}

                {/* Area fill */}
                <path d={areaPath} fill={color} opacity="0.12" />
                {/* Line */}
                <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Points */}
                {points.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4" fill={color} className="cursor-pointer">
                            <title>{`${data[i].label}: ${formatValue(data[i].value)}`}</title>
                        </circle>
                        <text x={p.x} y={height - 8} textAnchor="middle" className="text-[9px] fill-slate-400">
                            {data[i].label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

// Dữ liệu: [{ label, value, color }]
export function DonutChart({ data = [], size = 180, thickness = 26 }) {
    const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    let offset = 0;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    {/* Nền */}
                    <circle cx={center} cy={center} r={radius} fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth={thickness} />
                    {/* Các phần */}
                    {total > 0 && data.map((d, i) => {
                        const frac = (Number(d.value) || 0) / total;
                        const dash = frac * circumference;
                        const el = (
                            <circle
                                key={i}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke={d.color}
                                strokeWidth={thickness}
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                strokeDashoffset={-offset}
                                strokeLinecap="butt"
                            >
                                <title>{`${d.label}: ${d.value}`}</title>
                            </circle>
                        );
                        offset += dash;
                        return el;
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{total}</div>
                    <div className="text-xs text-slate-400">đơn hàng</div>
                </div>
            </div>

            {/* Chú thích */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="inline-block h-3 w-3 rounded-full" style={{ background: d.color }} />
                        <span className="text-slate-400">{d.label}</span>
                        <span className="font-semibold">{d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Dữ liệu: [{ label, value, image }]
export function HorizontalBarChart({ data = [], color = '#f59e0b', formatValue = (v) => v }) {
    const max = Math.max(1, ...data.map((d) => Number(d.value) || 0));

    return (
        <div className="space-y-4">
            {data.map((item, idx) => {
                const widthPct = Math.max(4, (Number(item.value) || 0) / max * 100);
                return (
                    <div key={idx} className="flex items-center gap-3">
                        {/* Ảnh sản phẩm */}
                        <img
                            src={resolveImageUrl(item.image)}
                            alt={item.label}
                            className="h-10 w-10 shrink-0 rounded-lg object-cover bg-slate-800"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="truncate text-slate-300 pr-2">{item.label}</span>
                                <span className="font-semibold text-slate-200 shrink-0">{formatValue(item.value)}</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-slate-700/60 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${widthPct}%`, background: color }}
                                />
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0 w-12 text-right">#{idx + 1}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default function ChartCard({ title, subtitle, children, className = '' }) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg ${className}`}>
            <div className="mb-4">
                <h3 className="font-bold text-white">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}
