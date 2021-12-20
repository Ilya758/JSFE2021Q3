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
      'начать'
    ).render();

    mainContent.append(mainHeading, mainButton);
    this.root.prepend(mainWrapper);
    this.animateToysButton();
  }

  animateToysButton() {
    const toysLink = this.root.querySelector('a[href="#toys-page"]');
    toysLink?.addEventListener('click', () => {
      toysLink?.classList.add('link_state_clicked');
      setTimeout(() => {
        document.body.style.opacity = '0';
      }, 500);
    });
  }
}

export default MainPage;
