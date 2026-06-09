import { CourseCard } from '../../components/courseCard/CourseCard.js';
import { Filters } from '../../components/filters/Filters.js';

export class ViewRenderer {
  constructor({ cardsData, filter, itemsPerPage = 9 }) {
    this.cardsData = cardsData;
    this.filter = filter;
    this.itemsPerPage = itemsPerPage;
    this.visibleCount = itemsPerPage;
  }

  loadMore(count = this.itemsPerPage) {
    this.visibleCount += count;
    this.cardRender();
    return this.visibleCount >= this.cardsData.length;
  }

  resetPagination() {
    this.visibleCount = this.itemsPerPage;
  }

  updateData(newData) {
    this.cardsData = newData;
    this.resetPagination();
    this.cardRender();
  }

  hasMore() {
    return this.visibleCount < this.cardsData.length;
  }

  cardRender() {
    const container = document.querySelector('.courses-container');
    container.innerHTML = '';
    const visibleData = this.cardsData.slice(0, this.visibleCount);
    visibleData.forEach((cardsData) => {
      const card = new CourseCard(cardsData);
      const cardElement = card.render();
      container.appendChild(cardElement);
    });
  }

  filterRender() {
    const container = document.querySelector('.course-filter');
    container.appendChild(this.filter.create());
  }
}
