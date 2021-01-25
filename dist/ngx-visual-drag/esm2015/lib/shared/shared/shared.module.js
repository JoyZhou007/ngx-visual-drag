import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
//#region
const list = [
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzLayoutModule,
    NzTabsModule,
    NzSelectModule,
];
//#endregion
//#region
const common = [CommonModule, FormsModule];
//#endregion
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [...common, ...list],
                exports: [common, ...list],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdmlzdWFsLWRyYWcvc3JjLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsU0FBUztBQUNULE1BQU0sSUFBSSxHQUFHO0lBQ1gsY0FBYztJQUNkLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztJQUNkLFlBQVk7SUFDWixjQUFjO0NBQ2YsQ0FBQztBQUNGLFlBQVk7QUFFWixTQUFTO0FBQ1QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDM0MsWUFBWTtBQU9aLE1BQU0sT0FBTyxZQUFZOzs7WUFMeEIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTnpNZXNzYWdlTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcbmltcG9ydCB7IE56TGF5b3V0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9sYXlvdXQnO1xuaW1wb3J0IHsgTnpUYWJzTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90YWJzJztcbmltcG9ydCB7IE56U2VsZWN0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zZWxlY3QnO1xuXG4vLyNyZWdpb25cbmNvbnN0IGxpc3QgPSBbXG4gIE56QnV0dG9uTW9kdWxlLFxuICBOeklucHV0TW9kdWxlLFxuICBOek1lc3NhZ2VNb2R1bGUsXG4gIE56TGF5b3V0TW9kdWxlLFxuICBOelRhYnNNb2R1bGUsXG4gIE56U2VsZWN0TW9kdWxlLFxuXTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb25cbmNvbnN0IGNvbW1vbiA9IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXTtcbi8vI2VuZHJlZ2lvblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbLi4uY29tbW9uLCAuLi5saXN0XSxcbiAgZXhwb3J0czogW2NvbW1vbiwgLi4ubGlzdF0sXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19