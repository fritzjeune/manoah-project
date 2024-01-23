const ReviewLine = ({
    label,
    text,
    labelStyle,
    textStyle,
    boxStyle,
}) => {

    return (
        <div className={`${boxStyle} flex justify-between w-[100%]`}>
            <p className={`${labelStyle}`}>{label}: </p>
            <p className={`${textStyle} font-semibold`}>{text}</p>
        </div>
    );
};

export default ReviewLine