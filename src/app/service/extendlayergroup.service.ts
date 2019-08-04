import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';



interface LayerGroupExtended extends LayerGroup {
  title: string
}

export { LayerGroupExtended as LayerGroup }



@Injectable({
  providedIn: 'root'
})

export class ExtendlayergroupService {
  constructor() { }
}
