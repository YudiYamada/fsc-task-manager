import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/use-get-tasks";

type DataProps = {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in_progress" | "pending";
};

const Home = () => {
  const { data: tasks } = useGetTasks();
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-brand-white col-span-2 col-start-1 space-y-6 rounded-[10px] p-6">
            <div>
              {" "}
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-brand-dark-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.map((task: DataProps) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className="bg-brand-white flex items-center justify-center space-y-6 rounded-[10px] p-6">
            <div>
              {" "}
              <h3 className="text-xl font-semibold">Frase</h3>
              <span className="text-brand-dark-gray text-sm">Motivacional</span>
              <p className="mt-2.5">
                Cada tarefa que você conclui hoje é um tijolo a mais na
                construção do seu futuro. Mesmo as menores ações, quando feitas
                com dedicação, constroem grandes conquistas. Lembre-se: o
                progresso não acontece de uma vez só, mas sim passo a passo,
                escolha por escolha, tarefa por tarefa. Termine o que começou,
                não porque é fácil, mas porque você é capaz. O esforço de hoje é
                o sucesso de amanhã — siga firme, você está mais perto do que
                imagina!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
