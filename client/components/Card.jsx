const Card = ({ children, hover }) => {
    return (
        <>
            <div className={!hover ? "card" : "card hover"}>
                <div className="card-body">{children}</div>
            </div>
        </>
    );
};
export default Card;
