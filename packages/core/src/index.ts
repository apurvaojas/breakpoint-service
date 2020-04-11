import EventEmitter from 'event-emitter-es6';
import '../scss/main.scss';

export interface MediaBreakpoint {
  screen: string;
  isTouchDevice: boolean;
  browser: string;
  os: string;
}

class BreakPointService extends EventEmitter {
  public readonly EVENTS: any = {
    onChange: 'mediaBreakpoint:onChange',
  };
  private lastMediaBreakpoint: MediaBreakpoint | null = null;
  private afterElementStyles: CSSStyleDeclaration | null;
  constructor() {
    super();
    this.afterElementStyles = window.getComputedStyle
      ? window.getComputedStyle(document.documentElement, ':after')
      : null;
    this.init();
  }

  private init() {
    window.addEventListener(
      'resize',
      this.onMediaBreakpointChange.bind(this)
    );
    window.addEventListener(
      'oriantationchange',
      this.onMediaBreakpointChange.bind(this)
    );
    window.addEventListener(
      'load',
      () => setTimeout(this.onMediaBreakpointChange.bind(this))
    );
  }

  private onMediaBreakpointChange() {
    if (
      this.lastMediaBreakpoint === null ||
      this.currentMediaBreakpoint.screen !== this.lastMediaBreakpoint.screen
    ) {
      this.emit(this.EVENTS.onChange, this.currentMediaBreakpoint);
    }
    this.lastMediaBreakpoint = { ...this.currentMediaBreakpoint };
  }

  get isTouchDevice(): boolean {
    if (!window.matchMedia) {
      console.warn(
        "mediaBreakpoint:isTouchDevice Doesn't supported in your browser"
      );
    }
    return window.matchMedia && window.matchMedia('(hover: none)').matches;
  }

  get userAgent(): string {
    return navigator.userAgent;
  }

  get currentMediaBreakpoint(): MediaBreakpoint {
    const o: MediaBreakpoint | any = {};
    o.screen = this.afterElementStyles
      ? this.afterElementStyles.getPropertyValue('content').replace(/\"/g, '')
      : '';
    o.isTouchDevice = this.isTouchDevice;
    o.userAgent = this.userAgent;
    return o;
  }
}

export default new BreakPointService();
