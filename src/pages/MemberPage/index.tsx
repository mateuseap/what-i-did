import { useEffect, useState } from "react";
import { Member } from "../../types";
import { useParams } from "react-router";
import MemberDetailsCard from "../../components/MemberDetailsCard";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MemberPage() {
  const { id } = useParams<{ id: string }>();

  const [member, setMember] = useState<Member>();
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMember = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://what-i-did.meap0187.repl.co/members/${id}`
      );
      const data = await response.json();
      setMember(data.member);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMember();
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-white mx-2 flex-grow">
        <ToastContainer />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
              What I did <span className="emotion-transition" />
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
              O que foi feito ao longo da semana pelos integrantes da nossa
              equipe da disciplina de Projetão, ministrada no CIn/UFPE!
            </p>
          </div>

          <div className="absolute top-0 left-0 p-4 opacity-0 lg:opacity-100">
            <Link to="/" className="text-blue-500">
              Home
            </Link>{" "}
            \ Detalhes do Membro
          </div>

          <div className="absolute top-0 left-0 p-4 opacity-100 lg:opacity-0">
            <Link to="/" className="text-blue-500">
              &lt;
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                {member ? (
                  <MemberDetailsCard
                    member={member}
                    refecthMember={fetchMember}
                  />
                ) : (
                  <p>
                    {isError
                      ? "Houve um erro ao carregar os dados do membro."
                      : "Membro não encontrado."}
                  </p>
                )}
              </>
            )}
          </div>
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

export default MemberPage;
