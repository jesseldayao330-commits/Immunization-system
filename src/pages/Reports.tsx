import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, FileText, Printer } from 'lucide-react';
import { mockPatients, mockImmunizationRecords, vaccines } from '@/data/mockData';

export default function Reports() {
  // Calculate stats for charts
  const statusData = [
    { 
      name: 'Completed', 
      value: mockImmunizationRecords.filter(r => r.status === 'completed').length,
      color: 'hsl(142, 70%, 40%)'
    },
    { 
      name: 'Pending', 
      value: mockImmunizationRecords.filter(r => r.status === 'pending').length,
      color: 'hsl(38, 92%, 50%)'
    },
    { 
      name: 'Overdue', 
      value: mockImmunizationRecords.filter(r => r.status === 'overdue').length,
      color: 'hsl(0, 72%, 51%)'
    },
  ];

  // Vaccine coverage data
  const vaccineData = vaccines.slice(0, 6).map(v => {
    const completed = mockImmunizationRecords.filter(
      r => r.vaccineId === v.id && r.status === 'completed'
    ).length;
    const total = mockImmunizationRecords.filter(r => r.vaccineId === v.id).length;
    return {
      name: v.name,
      completed,
      pending: total - completed,
    };
  });

  // Gender distribution
  const genderData = [
    { name: 'Male', value: mockPatients.filter(p => p.gender === 'Male').length, color: 'hsl(210, 70%, 50%)' },
    { name: 'Female', value: mockPatients.filter(p => p.gender === 'Female').length, color: 'hsl(330, 70%, 60%)' },
  ];

  return (
    <MainLayout title="Reports" subtitle="View immunization statistics and reports">
      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <Button variant="outline" className="gap-2">
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
        <Button variant="outline" className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Immunization Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Immunization Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Patient Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vaccine Coverage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading">Vaccine Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vaccineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="hsl(142, 70%, 40%)" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="hsl(38, 92%, 50%)" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Patients</p>
            <p className="text-3xl font-heading font-bold">{mockPatients.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Vaccinations</p>
            <p className="text-3xl font-heading font-bold">{mockImmunizationRecords.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <p className="text-3xl font-heading font-bold">
              {Math.round((statusData[0].value / mockImmunizationRecords.length) * 100)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Vaccines Tracked</p>
            <p className="text-3xl font-heading font-bold">{vaccines.length}</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
