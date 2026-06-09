import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./app-button.component.html",
  styleUrls: ["./app-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  readonly outline = input(false);
  readonly text = input("");
}
