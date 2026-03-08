import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vaccines } from '@/data/mockData';
import { Syringe, Baby, School, GraduationCap } from 'lucide-react';

function getAgeLabel(ageInMonths: number): string {
  if (ageInMonths === 0) return 'At Birth';
  if (ageInMonths < 12) return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years}y ${months}m`;
}

function getAgeCategory(ageInMonths: number) {
  if (ageInMonths <= 0) return { label: 'At Birth', icon: Baby, color: 'bg-primary/10 text-primary' };
  if (ageInMonths <= 12) return { label: 'Infant', icon: Baby, color: 'bg-accent/20 text-accent-foreground' };
  if (ageInMonths <= 72) return { label: 'Toddler/Child', icon: School, color: 'bg-secondary text-secondary-foreground' };
  return { label: 'School Age', icon: GraduationCap, color: 'bg-muted text-muted-foreground' };
}

export default function Vaccines() {
  const grouped = vaccines.reduce((acc, vaccine) => {
    const cat = getAgeCategory(vaccine.ageInMonths);
    if (!acc[cat.label]) acc[cat.label] = [];
    acc[cat.label].push(vaccine);
    return acc;
  }, {} as Record<string, typeof vaccines>);

  const categoryOrder = ['At Birth', 'Infant', 'Toddler/Child', 'School Age'];

  return (
    <MainLayout title="Vaccines" subtitle="List of all available vaccines in the immunization program">
      <div className="space-y-6">
        {categoryOrder.map((category) => {
          const items = grouped[category];
          if (!items || items.length === 0) return null;
          const cat = getAgeCategory(items[0].ageInMonths);
          const Icon = cat.icon;

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg text-foreground">{category}</h2>
                <Badge variant="secondary" className="ml-1">{items.length}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((vaccine) => (
                  <Card key={vaccine.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="font-heading text-base flex items-center gap-2">
                          <Syringe className="w-4 h-4 text-primary" />
                          {vaccine.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {getAgeLabel(vaccine.ageInMonths)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{vaccine.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Doses: {vaccine.doses}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
