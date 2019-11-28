import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { SplashComponent } from "./splash/splash.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookShelfComponent } from "./book-shelf/book-shelf.component";
import { BookLibraryComponent } from "./book-library/book-library.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },

  { path: "welcome", component: SplashComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "library", component: BookLibraryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
