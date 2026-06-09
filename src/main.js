import './style/global.scss';
import { ViewRenderer } from './features/renderer/Renderer';
import { Filters } from './components/filters/Filters';
import { coursesData } from './shared/data/data';
//filtering
function filterCourses(filters) {
  const { category, search } = filters;

  return coursesData.filter((course) => {
    let categoryMatch = true;
    if (category !== 'all') {
      categoryMatch = course.type === category;
    }

    let searchMatch = true;
    if (search.trim() !== '') {
      const title = course.title.toLowerCase();
      const author = course.author.toLowerCase();
      const query = search.toLowerCase();
      searchMatch = title.includes(query) || author.includes(query);
    }

    return categoryMatch && searchMatch;
  });
}

//update view
function updateDisplay(filters) {
  const filteredData = filterCourses(filters);

  renderer.updateData(filteredData);

  updateLoadMoreButton();
}

// update button load more
function updateLoadMoreButton() {
  const loadMoreContainer = document.querySelector('.more-container');
  if (!loadMoreContainer) return;

  if (renderer.hasMore()) {
    loadMoreContainer.style.display = 'flex';
  } else {
    loadMoreContainer.style.display = 'none';
  }
}

const filter = new Filters({
  data: coursesData,
  onFilterChange: (filters) => {
    updateDisplay(filters);
  },
});
const renderer = new ViewRenderer({ cardsData: coursesData, filter: filter, itemPerPage: 9 });

const rendering = renderer.cardRender();
renderer.filterRender();

const loadMoreContainer = document.querySelector('.pag-button');
if (loadMoreContainer) {
  loadMoreContainer.addEventListener('click', () => {
    const allLoaded = renderer.loadMore(9);

    if (allLoaded) {
      loadMoreContainer.style.display = 'none';
    }
  });
}

updateLoadMoreButton();
