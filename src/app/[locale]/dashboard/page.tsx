import React from 'react';

const notifications = [
  {
    id: 1,
    message: 'کاربر گرامی اشتراک شما رو به پایان است...',
    date: '۲۸ روز پیش',
  },
  {
    id: 2,
    message: 'به اطلاع شما می‌رساند گفتگو غیر اشتراکی شما...',
    date: '۲۷ روز پیش',
  },
  {
    id: 3,
    message: 'تخفیف ویژه برای اشتراک سالانه فقط تا ۳ روز دیگر!',
    date: '۲۵ روز پیش',
  },
  // ... اعلان‌های بیشتر
];

export default function DashboardPage() {
  return (
    <div className="text-right">
      <h1 className="text-2xl font-bold mb-4">اعلانات</h1>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="bg-white shadow p-4 rounded flex flex-col"
          >
            <span className="font-semibold">{notification.message}</span>
            <span className="text-gray-500 text-sm mt-2">{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
