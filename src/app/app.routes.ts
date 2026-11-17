import { Routes } from '@angular/router';
import { MovieList } from './compenents/movie-list/movie-list';
import { WishList } from './compenents/wish-list/wish-list';
import { MovieDetail } from './compenents/movie-details/movie-details';

export const routes: Routes = [

    {path:'',component:MovieList},

    {path:'wish-list',component:WishList},
            {path : ':id',component:MovieDetail},

    {path:'**',redirectTo:'',pathMatch:'full'}
];
