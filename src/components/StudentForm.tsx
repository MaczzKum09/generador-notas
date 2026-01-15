import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, UserPlus, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  id: string;
  name: string;
  grade: number | null;
}

interface StudentFormProps {
  onStudentsChange: (students: { name: string; grade: number | null }[]) => void;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  onLogoChange: (logo: string | null) => void;
  title: string;
  subtitle: string;
  logo: string | null;
}

const StudentForm = ({ 
  onStudentsChange, 
  onTitleChange, 
  onSubtitleChange, 
  onLogoChange,
  title, 
  subtitle,
  logo 
}: StudentFormProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addStudent = () => {
    if (!newName.trim()) return;
    
    const gradeValue = newGrade === "NP" ? null : parseInt(newGrade) || 0;
    
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      grade: gradeValue,
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    onStudentsChange(updatedStudents.map(s => ({ name: s.name, grade: s.grade })));
    
    setNewName("");
    setNewGrade("");
  };

  const removeStudent = (id: string) => {
    const updatedStudents = students.filter(s => s.id !== id);
    setStudents(updatedStudents);
    onStudentsChange(updatedStudents.map(s => ({ name: s.name, grade: s.grade })));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStudent();
    }
  };

  const getGradeLabel = (grade: number | null) => {
    if (grade === null) return "NP";
    if (grade >= 17) return "AD";
    if (grade >= 13) return "A";
    if (grade >= 9) return "B";
    return "C";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full shadow-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-primary" />
        Configurar Evaluación
      </h2>

      {/* Logo upload */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">
          Logo de la Institución
        </Label>
        <div className="flex items-center gap-4">
          {logo ? (
            <div className="relative">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 object-contain rounded-lg border border-border bg-white"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
            >
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              {logo ? "Cambiar logo" : "Subir logo"}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG o SVG. Máximo 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Title and Subtitle inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Título
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ej: Práctica de Matemáticas"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="subtitle" className="text-sm font-medium text-foreground">
            Subtítulo
          </Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Ej: Semilleros 2 - Primera Evaluación"
            className="mt-1"
          />
        </div>
      </div>

      {/* Add student form */}
      <div className="border-t border-border pt-4">
        <Label className="text-sm font-medium text-foreground mb-3 block">
          Agregar Estudiante
        </Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre completo del estudiante"
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-32">
            <Select value={newGrade} onValueChange={setNewGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Nota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NP">No se presentó</SelectItem>
                {Array.from({ length: 21 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i} ({i >= 17 ? "AD" : i >= 13 ? "A" : i >= 9 ? "B" : "C"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addStudent} className="gap-2">
            <Plus className="w-4 h-4" />
            Agregar
          </Button>
        </div>
      </div>

      {/* Student list */}
      <AnimatePresence>
        {students.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 border-t border-border pt-4"
          >
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Estudiantes agregados ({students.length})
            </Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm font-mono">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-foreground font-medium">
                      {student.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                      student.grade === null ? "bg-gray-100 text-gray-500" :
                      student.grade >= 17 ? "bg-emerald-50 text-emerald-600" :
                      student.grade >= 13 ? "bg-blue-50 text-blue-600" :
                      student.grade >= 9 ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-500"
                    }`}>
                      {student.grade === null ? "NP" : `${getGradeLabel(student.grade)} = ${student.grade}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStudent(student.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentForm;
