interface IHoodModel {
    hoodId: number;
    beat: string;
    name: string;
    reports: [
      {
        reportId: number;
      }
    ];
  }
  export default IHoodModel;