import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PatientTable } from '@/components/patients/PatientTable';
import { PatientForm } from '@/components/patients/PatientForm';
import { PatientDetails } from '@/components/patients/PatientDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download } from 'lucide-react';
import { mockPatients, mockImmunizationRecords } from '@/data/mockData';
import { Patient } from '@/types/patient';
import { toast } from 'sonner';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(p => 
    `${p.firstName} ${p.lastName} ${p.middleName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.motherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setDetailsOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditPatient(patient);
    setFormOpen(true);
  };

  const handleDelete = (patient: Patient) => {
    if (confirm(`Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`)) {
      setPatients(prev => prev.filter(p => p.id !== patient.id));
      toast.success('Patient deleted successfully');
    }
  };

  const handleSave = (data: Omit<Patient, 'id' | 'registeredDate'>) => {
    if (editPatient) {
      setPatients(prev => prev.map(p => 
        p.id === editPatient.id 
          ? { ...p, ...data }
          : p
      ));
      toast.success('Patient updated successfully');
    } else {
      const newPatient: Patient = {
        ...data,
        id: String(Date.now()),
        registeredDate: new Date().toISOString().split('T')[0],
      };
      setPatients(prev => [...prev, newPatient]);
      toast.success('Patient registered successfully');
    }
    setEditPatient(null);
  };

  const handleAddNew = () => {
    setEditPatient(null);
    setFormOpen(true);
  };

  return (
    <MainLayout title="Patients" subtitle={`${patients.length} registered patients`}>
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or mother's name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Table */}
      <PatientTable
        patients={filteredPatients}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Patient Form Modal */}
      <PatientForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditPatient(null);
        }}
        patient={editPatient}
        onSave={handleSave}
      />

      {/* Patient Details Modal */}
      <PatientDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        patient={selectedPatient}
        immunizationRecords={mockImmunizationRecords}
      />
    </MainLayout>
  );
}
