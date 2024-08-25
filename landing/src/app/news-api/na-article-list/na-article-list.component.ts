import { Component } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css']
})

export class NaArticleListComponent {
  articles: Article[] = [];
  numberOfPages: number = 0;
  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe(articles => {
      this.articles = articles;
    });
    this.newsApiService.numberOfPages.subscribe(numberOfPages => {
      this.numberOfPages = numberOfPages;
    });
    this.newsApiService.getPage(1);
  }
}
