import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";
import { Member } from "../../types";
import { Link } from "react-router-dom";

function Home() {
  const [members, setMembers] = useState<Array<Member>>();
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://cat-lover.meap0187.repl.co/members"
      );
      const data = await response.json();
      setMembers(data.members);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!members) {
      fetchMembers();
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredMembers = members?.filter((member: Member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const membersToShow = filteredMembers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isPreviousPageAvailable = currentPage > 1;
  const isNextPageAvailable =
    currentPage < Math.ceil((filteredMembers?.length || 0) / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-white mx-12 flex-grow">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
            What I did{" "}<span className="emotion-transition"/>
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
              O que foi feito ao longo da semana pelos integrantes da nossa equipe
              da disciplina de Projetão, ministrada no CIn/UFPE!
            </p>
          </div>

          <div className="absolute top-0 left-0 p-4 opacity-0 lg:opacity-100">
            Home
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center text-center">
              <p>Carregando...</p>
            </div>
          ) : (
            <>
              {membersToShow ? (
                <>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar pelo nome..."
                    className="mb-4 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1 lg:grid-cols-2">
                    {membersToShow.length > 0 ? (
                      membersToShow.map((member: Member) => (
                        <Link key={member.id} to={`/members/${member.id}`}>
                          <MemberCard member={member} />
                        </Link>
                      ))
                    ) : (
                      <div className="flex flex-col self-center">
                        <p>Nenhum membro encontrado.</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-x-4">
                    <button
                      className={`w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mr-3 sm:text-sm ${
                        !isPreviousPageAvailable &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!isPreviousPageAvailable}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Página Anterior
                    </button>
                    <button
                      className={`w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mr-3 sm:text-sm ${
                        !isNextPageAvailable && "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!isNextPageAvailable}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Próxima Página
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center text-center">
                  <p>
                    {isError
                      ? "Houve um erro ao carregar os membros da equipe."
                      : "Sem membros registrados na equipe."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <footer className="bg-white text-center lg:text-left">
        <div className="p-4 text-center text-black">
          © 2023 Feito por{" "}
          <a className="text-blue-500" href="https://www.mateuseap.com/">
            @mateuseap
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
