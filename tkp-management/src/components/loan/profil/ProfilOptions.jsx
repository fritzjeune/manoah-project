import MortgageTable from "./MortgageTable";
import { useState } from "react";
import ReferencePerson from "./ReferencePerson";
import Pledge from "./Pledge";
import CommiteeDecisions from "./CommiteeDecisions";

const ProfileOptions = () => {
    const [actWindow, setActWindow] = useState(0);
    const entOptions = [
        "Payments",
        "Reference Persons",
        "Pledges",
        "Commitee Decision"
    ];

    return (
        <div className="assu-profil-opt-content" style={{ height: "500px", display: "grid", gap: "20px", gridTemplateRows: "50px calc(100%-50px)", justifyItems: ""}}>
            <div className="w-[100%] h-full grid grid-cols-6">
                {entOptions.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => setActWindow(i)}
                        className={`p-[10px] bg-primary text-sm ${actWindow === i
                            ? "bg-secondary text-white font-bold"
                            : "bg-primaryColor"
                            } text-white hover:bg-blue-100 hover:text-primaryColor`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {actWindow === 0 ? (
                <MortgageTable />
            ) : actWindow === 1 ? (
                <ReferencePerson />
            ) : actWindow === 2 ? (
                <Pledge />
            ) : actWindow === 3 ? (
                <CommiteeDecisions />
            ) : (
                <MortgageTable />
            )
            }
        </div>
    );
};

export default ProfileOptions