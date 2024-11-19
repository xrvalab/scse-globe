type Accessor<In, Out> = Out | string | ((obj: In) => Out);

export default Accessor;
