
  static renderFooter() {
    const footerWrapper = new BEMWrapper('footer', 'footer').render();
    const footerContent = footerWrapper.querySelector(
      '.footer__content'
    ) as HTMLDivElement;

    const copyright = new Text(
      'span',
      'text footer__text',
      '2021 \u00A9'
    ).render();
    const author = new ButtonLink(
      'text footer__author',
      true,
      'https://github.com/Ilya758',
      'app developer: illia skaryna'
    ).render();
    const logoSchool = new ButtonLink(
      'icon footer__logo',
      true,
      'https://rs.school',
      '1'
    ).render();

    footerContent.append(author, copyright, logoSchool);

    return footerWrapper;
  }


export default View;
