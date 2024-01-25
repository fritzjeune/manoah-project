import BorrowerLoans from "./BorrowerLoans";
import { useState } from "react";
import Savings from "./Savings";
import Contacts from "./Contacts";

const ProfileOptions = ({loans, contacts, address, email}) => {
    const [actWindow, setActWindow] = useState(0);
    const entOptions = [
        "Loans",
        "Saving",
        "Contacts",
    ];
    console.log(address)

    return (
        <div className="" style={{ height: "500px", display: "grid", gap: "20px", gridTemplateRows: "50px calc(100%-50px)", justifyItems: ""}}>
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
                <BorrowerLoans loans={loans} />
            ) : actWindow === 1 ? (
                <Savings />
            ) : actWindow === 2 ? (
                <Contacts contacts={contacts} email={email} address={address} />
            ) : (
                <></>
            )
            }
        </div>
    );
};

export default ProfileOptions