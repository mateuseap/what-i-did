import { useState } from "react";
import { Member } from "../../types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

export interface MemberDetailsCardProps {
  member: Member;
  refecthMember: () => void;
}

function MemberDetailsCard({ member, refecthMember }: MemberDetailsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWhatIDid, setNewWhatIDid] = useState("");
  const [isRequestRunning, setIsRequestRunning] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewWhatIDid("");
  };

  const handleUpdate = () => {
    if (isRequestRunning) return;

    setIsRequestRunning(true);
    const data = {
      name: member.name,
      what_i_did: newWhatIDid,
    };

    toast.info("Atualizando...", {
      position: "bottom-center",
      hideProgressBar: true,
      draggable: true,
      progress: undefined,
    });

    fetch("https://what-i-did.meap0187.repl.co/what-i-did", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .then(() => {
        closeModal();
        setIsRequestRunning(false);
        toast.dismiss();
        toast.success(
          "Sucesso! Os dados serão atualizados na página em alguns segundos.",
          {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
          }
        );

        setTimeout(() => {
          refecthMember();
        }, 3000);
      })
      .catch(() => {
        closeModal();
        setIsRequestRunning(false);
        toast.dismiss();
        toast.error(
          "Ocorreu um erro. Tente novamente mais tarde.",
          {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  return (
    <>
      <button
        className="flex items-center justify-center gap-x-1 px-2 py-4 hover:text-blue-500"
        onClick={openModal}
      >
        <PencilSquareIcon className="w-6 h-6" /> Atualizar o que eu fiz
      </button>

      {/* Modal */}
      <div className="flex flex-col gap-y-8">
        {isModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center mx-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
              <div className="bg-white px-6 py-8 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Atualizar o que eu fiz
                    </h3>
                    <div className="mt-2">
                      <textarea
                        className="resize-none border rounded-md w-full p-4"
                        rows={6}
                        placeholder="Conte o que você fez..."
                        value={newWhatIDid}
                        onChange={(e) => setNewWhatIDid(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col items-center sm:flex-row sm:justify-center">
                <button
                  type="button"
                  className={`w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mr-3 sm:text-sm ${
                    isRequestRunning && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={`w-full sm:w-auto mt-3 sm:mt-0 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${
                    isRequestRunning && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleUpdate}
                >
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          key={member.name}
          className="relative flex flex-col gap-y-4 p-4 bg-white rounded-md overflow-hidden transition-transform duration-300 transform hover:scale-105"
        >
          <img
            className="w-full rounded-full max-w-[15rem] mx-auto"
            src={member.image_link}
            alt={`${member.name} Avatar`}
            draggable={false}
          />
          <h3 className="text-xl font-bold tracking-tight text-black text-center">
            {member.name}
          </h3>
          <div className="bg-gray-800 border-gray-700 rounded-md overflow-hidden">
            <p className="mt-3 mb-4 px-4 py-3 font-light text-gray-400">
              {member.what_i_did}
            </p>
          </div>
          <span className="text-left mt-4">
            Última atualização: {member.updated_at ? member.updated_at : "N/A"}
          </span>
        </div>
      </div>
    </>
  );
}

export default MemberDetailsCard;
