import Page from '../core/abstract/page';
import ButtonLink from '../core/components/button-link';
import Text from '../core/components/text';
import BEMWrapper from '../core/templates/bem-wrapper';

class MainPage extends Page {
  protected root;

  constructor(readonly id: string) {
    super(id);
    this.root = document.querySelector('#root') as HTMLDivElement;
  }

  render(): void {
    // creating main
    const mainWrapper = new BEMWrapper('main', this.id).render();
    const mainContent = mainWrapper.querySelector(
      `.${this.id}__content`
    ) as HTMLDivElement;
    const mainHeading = new Text(
      'h1',
      `heading ${this.id}__heading`,
      'помогите бабушке нарядить ёлку'
    ).render();
    const mainButton = new ButtonLink(
      `text ${this.id}__link`,
      false,
      'toys',
      'начать'
    ).render();

    mainContent.append(mainHeading, mainButton);
    // creating footer
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
    this.root.append(mainWrapper, footerWrapper);
  }
}

export default MainPage;
