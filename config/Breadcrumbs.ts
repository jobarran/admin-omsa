

const breadcrumbPersonalDetail = [
    { key: 'obra', name: activeObra?.name, link: `/obra/${activeObra?.idObra}` },
    { key: 'breadSecond', name: router.asPath.split('/')[1], link: `/obra/${activeObra?.idObra}/${router.asPath.split('/')[1]}` },
    { key: 'breadThird', name: `${personal.name} ${personal.lastName}`, link: undefined }
  ]