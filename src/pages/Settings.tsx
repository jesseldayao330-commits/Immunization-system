import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building2, Bell, Shield, Database } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { changePassword } = useAuth();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <MainLayout title="Settings" subtitle="Manage system settings">
      <div className="max-w-3xl space-y-6">
        {/* Barangay Info */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Barangay Information
            </CardTitle>
            <CardDescription>Update your barangay details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="barangayName">Barangay Name</Label>
                <Input id="barangayName" defaultValue="Panubigan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality</Label>
                <Input id="municipality" placeholder="Enter municipality" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input id="province" placeholder="Enter province" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" placeholder="Enter region" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthCenter">Health Center Name</Label>
              <Input id="healthCenter" defaultValue="Barangay Panubigan Health Center" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Vaccination Reminders</p>
                <p className="text-sm text-muted-foreground">Send reminders for upcoming vaccinations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Overdue Alerts</p>
                <p className="text-sm text-muted-foreground">Get alerts for overdue vaccinations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Monthly Reports</p>
                <p className="text-sm text-muted-foreground">Receive monthly summary reports</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <Button onClick={() => {
              if (!currentPassword || !newPassword || !confirmPassword) {
                toast({ title: 'Error', description: 'Punan lahat ng fields.', variant: 'destructive' });
                return;
              }
              if (newPassword !== confirmPassword) {
                toast({ title: 'Error', description: 'Hindi magkatugma ang bagong password.', variant: 'destructive' });
                return;
              }
              const result = changePassword(currentPassword, newPassword);
              if (result.success) {
                toast({ title: 'Success', description: 'Matagumpay na nabago ang password!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              } else {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
              }
            }}>Update Password</Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Data Management
            </CardTitle>
            <CardDescription>Backup and export data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Export All Data</p>
                <p className="text-sm text-muted-foreground">Download all patient and immunization records</p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Backup Database</p>
                <p className="text-sm text-muted-foreground">Create a backup of the system database</p>
              </div>
              <Button variant="outline">Backup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
