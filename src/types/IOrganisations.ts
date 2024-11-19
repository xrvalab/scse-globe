interface IOrganisation {
  name: string;
  icon: string;
}

interface IOrganisations {
  [key: string]: IOrganisation;
}

export default IOrganisations;
