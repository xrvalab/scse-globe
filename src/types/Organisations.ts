interface Organisation {
  name: string;
  icon: string;
}

interface Organisations {
  [key: string]: Organisation;
}

export default Organisations;
