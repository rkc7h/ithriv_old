import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryResource } from '../category-resource';
import { hexColorToRGBA } from '../shared/color';
import { ResourceApiService } from '../shared/resource-api/resource-api.service';
import { User } from '../user';

@Component({
  selector: 'app-category-network-view',
  templateUrl: './category-network-view.component.html',
  styleUrls: ['./category-network-view.component.scss']
})
export class CategoryNetworkViewComponent implements OnInit {
  categoryId: number;
  category: Category;
  categoryResources: CategoryResource[];
  isDataLoaded = false;
  user: User;

  selfRadius = 80;
  parentRadius = 70;
  nodeRadius = 60;
  rootNodeAngle = 35;
  selfTitleHeight = 60;
  parentTitleHeight = 40;
  strokeWidth = 4;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ResourceApiService,
    private titleService: Title
  ) {

    this.route.params.subscribe(params => {
      console.log('params', params);

      this.categoryId = params['category'];
      this.loadCategory(this.categoryId);
    });
  }

  loadCategory(categoryId: Number) {
    this.api.getCategory(categoryId).subscribe(
      (category) => {
        console.log('loadCategory category', category);
        this.category = category;

        // Set page title
        const currentTitle = this.titleService.getTitle();
        this.titleService.setTitle(`${currentTitle} - ${this.category.name}`);
      }
    );
  }

  ngOnInit() {
  }

  private rotateChildDegrees(i: number) {
    if (this.category.children.length > 0) {
      const numNodes = this.categoryNodes(this.category).length;
      return i * 360 / numNodes + this.rootNodeAngle;
    }

    return 0;
  }

  rotateChild(i: number) {
    if (this.category.children.length > 0) {
      console.log('this.rotateChildDegrees(i)', this.rotateChildDegrees(i));

      return `rotate(${this.rotateChildDegrees(i)})`;
    }
  }

  unrotateChild(node: Category, i: number) {
    if (this.category.children.length > 0) {
      return `rotate(${-this.rotateChildDegrees(i)}, ${this.nodeLineLength(node, i) + this.nodeRadius}, 0)`;
    }
  }

  isParentNode(node: Category) {
    return node.level < this.category.level;
  }

  categoryNodes(category: Category) {
    if (category.parent) {
      return [category.parent].concat(category.children);
    } else if (category.children && (category.children.length > 0)) {
      return category.children;
    } else {
      return [];
    }
  }

  nodeLineLength(node: Category, i: number) {
    if (this.isParentNode(node) && (i === 0)) {
      return this.selfRadius + this.nodeRadius * 4;
    } else {
      return this.selfRadius + this.nodeRadius * 2;
    }
  }

  childPosX(i: number) {
    console.log('childPosX i', i);
    return 20 * (i + 1);
  }

  childPosY(i: number) {
    console.log('childPosY i', i);
    return 20 * (i + 1);
  }

  words(s: string) {
    console.log('s', s);

    return s.trim().split(' ');
  }

  goCategory(c: Category) {
    this.router.navigate(['category', c.id, 'network']);
  }

  backgroundImage(c: Category) {
    return `url('/assets/browse/${c.image}')`;
  }

  nodeImageSize(c: Category) {
    if (c.id === this.category.id) {
      return (this.selfRadius - this.strokeWidth) * 2 - this.strokeWidth;
    } else {
      return (this.nodeRadius - this.strokeWidth) * 2 - this.strokeWidth;
    }
  }

  nodeImagePath(c: Category) {
    return `/assets/browse/${c.image}`;
  }
}
