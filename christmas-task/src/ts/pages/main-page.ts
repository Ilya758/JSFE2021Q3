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
      'toys-page',
      'Начать'
    ).render();
    const treeButton = new ButtonLink(
      `text ${this.id}__link`,
      false,
      'decorate-page',
      'Нарядить ёлку'
    ).render();

    mainContent.append(mainHeading, mainButton, treeButton);
    this.root.prepend(mainWrapper);
    this.animateToysButton();
  }

  animateToysButton() {
    const toysLink = Array.from(
      this.root.querySelectorAll('.text.main-page__link')
    ).slice(0, 2);
    toysLink.forEach(link => {
      link?.addEventListener('click', () => {
        link?.classList.add('link_state_clicked');
        setTimeout(() => {
          document.body.style.opacity = '0';
        }, 500);
      });
    });
  }
}

export default MainPage;
