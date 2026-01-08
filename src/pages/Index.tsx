import GradeCard from "@/components/GradeCard";

const students = [
  { name: "Ivanna Lucero Carrero Zapata", grade: 12 },
  { name: "Danae Cristtel De Vettori Calle", grade: 12 },
  { name: "Fergie Farias Ynfante", grade: 10 },
  { name: "Danae Sanjinez Fuentes", grade: 0 },
  { name: "Danna Camila Saavedra Balladares", grade: 1 },
  { name: "Kristhel Mileth Davis Mendoza", grade: 9 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <GradeCard 
        title="Práctica de Matemáticas"
        subtitle="Semilleros 2 - Primera Evaluación"
        students={students}
      />
    </div>
  );
};

export default Index;
