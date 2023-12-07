import { Member } from "../../types";

export interface MemberCardProps {
  member: Member;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <div
      key={member.name}
      className="items-center rounded-lg shadow sm:flex bg-gray-800 border-gray-700 transition-transform transform hover:scale-105"
    >
      <img
        className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg max-w-full sm:max-w-[15rem]"
        src={member.image_link}
        alt={`${member.name} Avatar`}
        draggable={false}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-white">
          {member.name}
        </h3>
        <p className="mt-3 mb-4 font-light text-gray-400 overflow-hidden line-clamp-2">
          {member.what_i_did}
        </p>
      </div>
    </div>
  );
}

export default MemberCard;