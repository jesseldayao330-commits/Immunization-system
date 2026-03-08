import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentPatients } from '@/components/dashboard/RecentPatients';
import { UpcomingSchedule } from '@/components/dashboard/UpcomingSchedule';
import { Users, Syringe, Clock, AlertTriangle } from 'lucide-react';
import { mockPatients, mockImmunizationRecords } from '@/data/mockData';

export default function Dashboard() {
  const stats = {
    totalPatients: mockPatients.length,
    completedVaccinations: mockImmunizationRecords.filter(r => r.status === 'completed').length,
    pendingVaccinations: mockImmunizationRecords.filter(r => r.status === 'pending').length,
    overdueVaccinations: mockImmunizationRecords.filter(r => r.status === 'overdue').length,
  };

  return (
    <MainLayout title="Dashboard" subtitle="Welcome to Barangay Panubigan Immunization System">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          variant="default"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Completed Vaccinations"
          value={stats.completedVaccinations}
          icon={Syringe}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Vaccinations"
          value={stats.pendingVaccinations}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Overdue Vaccinations"
          value={stats.overdueVaccinations}
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPatients patients={mockPatients} />
        <UpcomingSchedule records={mockImmunizationRecords} patients={mockPatients} />
      </div>
    </MainLayout>
  );
}
