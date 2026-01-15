import GradeCard from "@/components/GradeCard";

const students = [
  { name: "Gadiel Polo Dios", grade: 16 },
  { name: "Stefano Josue Cruz Yon", grade: 0 },
  { name: "Ivana Lucero Carrero Zapata", grade: 3 },
  { name: "Luciana Fairolet Bernal Cornejo", grade: 2 },
  { name: "Brittany Montero Barreto", grade: 0 },
  { name: "Liana Mercedes Thais Chavez Vazquez", grade: 2 },
  { name: "Danae Cristtel De Vettori", grade: 3 },
  { name: "Fergie Farias Ynfante", grade: 0 },
  { name: "Kelvin Lian Moran Gomez", grade: 0 },
  { name: "Kristhel Mileth David Mendoza", grade: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <GradeCard 
        title="Práctica 2 de Matemáticas"
        subtitle="Evaluación Semanal"
        students={students}
      />
    </div>
  );
};

export default Index;
