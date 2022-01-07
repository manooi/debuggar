export const sidebarItems = [
  {
    label: 'Debuggers',
    items: [
      {
        label: 'Property summary',
        icon: 'pi pi-refresh',
        url: '/json-summary',
        command: () => {
          // this.update();
        },
      },
      {
        label: 'Property aggregate',
        icon: 'pi pi-times',
        url: '/json-aggregate',
        command: () => {
          // this.delete();
        },
      },
    ],
  },
  //   {
  //     label: 'Navigate',
  //     items: [
  //       {
  //         label: 'Angular Website',
  //         icon: 'pi pi-external-link',
  //         url: 'http://angular.io',
  //       },
  //       {
  //         label: 'Router',
  //         icon: 'pi pi-upload',
  //       },
  //     ],
  //   },
];
