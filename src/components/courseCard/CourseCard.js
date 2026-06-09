import './courseCard.scss';

export class CourseCard {
  constructor({ title, price, author, category, image, id, type }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.author = author;
    this.category = category;
    this.image = image;
    this.type = type;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.id = this.id;

    card.innerHTML = `
    <div class="course-card">
     <div class="course-card__image">
        <img src="${this.image}" alt="${this.title}">
      </div>
      <div class="course-card__content">
        <div class="course-card__category ${this.type} ">${this.category}</div>
        <h3 class="course-card__title">${this.title}</h3>
        <div class="course-card__footer">
          <span class="course-card__price">$${this.price}</span>
          <span class="course-card__author">| by ${this.author}</span>
        </div>
      </div>
    </div>
     
    `;

    return card;
  }

  updatePrice(newPrice) {
    this.price = newPrice;
  }

  updateCategory(newCategory) {
    this.category = newCategory;
  }

  static fromData(data) {
    return new CourseCard(data);
  }
}
