import ButtonLink from '../../core/components/button-link';
import Text from '../../core/components/text';
import BEMWrapper from '../../core/templates/bem-wrapper';
import { ICard } from '../../models/card';
import MainPage from '../../pages/main-page';
import ToysPage from '../../pages/toys';

class View {
  protected root;

  constructor() {
    this.root = document.querySelector('#root') as HTMLDivElement;
    this.root.append(View.renderFooter());
  }

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

  render(id = 'main-page', toysArray?: ICard[] | null) {
    Array.from(this.root.children).forEach(child => {
      if (child.tagName.toLowerCase() !== 'footer') {
        child.remove();
      }
    });

    if (id === 'toys-page') {
      let toysPage = new ToysPage(id);
      toysPage.render(toysArray as ICard[]);
      return toysPage;
    }
    let mainPage = new MainPage(id);
    mainPage.render();

    return mainPage;
  }
}

export default View;
