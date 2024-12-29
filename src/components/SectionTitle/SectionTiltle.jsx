
const SectionTiltle = ( {heading, subHeading}) => {
    return (
        <div className="md:w-1/4 mx-auto my-8">
            <p className="text-yellow-500 text-center mb-4">---{subHeading}---</p>
            <h3 className="text-3xl text-center uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTiltle;