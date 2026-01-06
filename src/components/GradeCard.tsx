import { motion } from "framer-motion";

interface Student {
  name: string;
  grade: number;
}

interface GradeCardProps {
  title?: string;
  subtitle?: string;
  students: Student[];
  logoPlaceholder?: boolean;
}

const GradeCard = ({ 
  title = "Práctica de Matemáticas", 
  subtitle = "Semilleros 2 - Primera Evaluación",
  students,
  logoPlaceholder = true 
}: GradeCardProps) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 4) return "text-emerald-600";
    if (grade >= 2) return "text-amber-600";
    return "text-red-500";
  };

  const getGradeBg = (grade: number) => {
    if (grade >= 4) return "bg-emerald-50";
    if (grade >= 2) return "bg-amber-50";
    return "bg-red-50";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card-elegant max-w-2xl w-full overflow-hidden"
    >
      {/* Header con espacio para logo */}
      <div className="bg-navy p-6 relative">
        {/* Decorative gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(45,70%,50%)] to-transparent opacity-60" />
        
        <div className="flex items-start gap-6">
          {/* Logo placeholder */}
          {logoPlaceholder && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-20 h-20 rounded-lg bg-white/10 border-2 border-[hsl(45,70%,50%)]/40 flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
            >
              <span className="text-[hsl(45,70%,50%)]/60 text-xs text-center font-medium">
                Tu Logo
              </span>
            </motion.div>
          )}
          
          {/* Title section */}
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-2xl font-bold text-white tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-[hsl(45,70%,70%)] mt-1 font-light tracking-wide"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="p-6">
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] bg-muted">
            <div className="px-5 py-3 text-left">
              <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                Estudiante
              </span>
            </div>
            <div className="px-5 py-3 text-center border-l border-border">
              <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                Calificación
              </span>
            </div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-border">
            {students.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                className="grid grid-cols-[1fr_auto] hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="px-5 py-4">
                  <span className="text-foreground font-medium">
                    {student.name}
                  </span>
                </div>
                <div className="px-5 py-4 border-l border-border flex items-center justify-center min-w-[120px]">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getGradeBg(student.grade)} ${getGradeColor(student.grade)}`}>
                    C = {student.grade}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 pt-4 border-t border-border flex justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">
            Total de estudiantes: <span className="font-semibold text-foreground">{students.length}</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Excelente (4-5)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Regular (2-3)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Bajo (0-1)
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GradeCard;
