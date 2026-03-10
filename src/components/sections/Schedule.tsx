'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarProps {
  year: number;
  month: number;
  monthNames: string[];
  dayNames: string[];
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

function Calendar({ year, month, monthNames, dayNames, onSelectDate, selectedDate }: CalendarProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-center font-bold text-[#1A1A1A] text-lg mb-4">
        {monthNames[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-[#6B7280] py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isPast = dateStr < todayStr;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          return (
            <button
              key={dateStr}
              onClick={() => !isPast && onSelectDate(dateStr)}
              disabled={isPast}
              className={[
                'aspect-square flex items-center justify-center text-sm rounded-lg font-medium transition-colors',
                isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-[#C8102E]/10',
                isSelected ? 'bg-[#C8102E] text-white hover:bg-[#C8102E]' : '',
                isToday && !isSelected ? 'border-2 border-[#F5A623] text-[#C8102E]' : '',
                !isPast && !isSelected && !isToday ? 'text-[#1A1A1A]' : '',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Schedule() {
  const t = useTranslations('schedule');
  const monthNames = t.raw('months') as string[];
  const dayNames = t.raw('days') as string[];

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const scrollToForm = () => {
    if (selectedDate) {
      sessionStorage.setItem('preferredDate', selectedDate);
    }
    document.getElementById('catering-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4">{t('title')}</h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6 px-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm">
            {selectedDate && (
              <span className="text-[#C8102E] font-semibold">
                Selected: {selectedDate}
              </span>
            )}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Two calendars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Calendar
            year={viewYear}
            month={viewMonth}
            monthNames={monthNames}
            dayNames={dayNames}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <Calendar
            year={nextMonthYear}
            month={nextMonthIndex}
            monthNames={monthNames}
            dayNames={dayNames}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm text-[#6B7280] mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#C8102E]" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-[#F5A623]" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
            <span>Available</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="inline-block bg-[#C8102E] hover:bg-[#a00d24] text-white font-bold px-10 py-4 rounded-full text-base transition-colors shadow-lg"
          >
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
