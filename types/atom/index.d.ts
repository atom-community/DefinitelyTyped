// Type definitions for non-npm package Atom 1.40
// Project: https://github.com/atom/atom
// Definitions by: GlenCFL <https://github.com/GlenCFL>
//                 smhxx <https://github.com/smhxx>
//                 lierdakil <https://github.com/lierdakil>
//                 aminya <https://github.com/aminya>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

// NOTE: only those classes exported within this file should be retain that status below.
// https://github.com/atom/atom/blob/v1.40.0/exports/atom.js

/// <reference types="node" />

// Imports ======================================================
import { Config } from "./src/config";
import { CommandRegistry } from "./src/command-registry";
import { Disposable } from "./dependencies/event-kit";
import {
    MarkerLayer,
    Point,
} from "./dependencies/text-buffer";
import { DecorationOptions } from "./src/decoration";
import { NotificationManager } from "./src/notification-manager";
import { TextEditor } from "./src/text-editor";
import { TextEditorElement } from "./src/text-editor-element";
import { TextEditorRegistry } from "./src/text-editor-registry";
import { TooltipManager } from "./src/tooltip-manager";
import { ViewRegistry } from "./src/view-registry";
import { Workspace } from "./src/workspace";
import { Clipboard } from "./src/clipboard";
import { ContextMenuManager } from "./src/context-menu-manager";
import { DeserializerManager } from "./src/deserializer-manager";
import { HistoryManager } from "./src/history-manager";
import { KeymapManager } from "./src/keymap-extensions";
import { PackageManager } from "./src/package-manager";
import { MenuManager } from "./src/menu-manager";
import { Pane } from "./src/pane";
import { PathWatcher } from "./src/path-watcher";
import { Project } from "./src/project";
import { StyleManager } from "./src/style-manager";
import { ThemeManager } from "./src/theme-manager";
import { GrammarRegistry } from "./src/grammar-registry";

declare global {
    const atom: AtomEnvironment;

    interface HTMLElementTagNameMap {
      "atom-text-editor": TextEditorElement;
    }
}

/**
 *  Invoke a callback with each filesystem event that occurs beneath a specified path.
 *  If you only need to watch events within the project's root paths, use
 *  Project::onDidChangeFiles instead.
 */
export function watchPath(rootPath: string, options: {}, eventCallback: (events:
    FilesystemChangeEvent) => void): Promise<PathWatcher>;

// Essential Classes ==========================================================

/**
 *  Atom global for dealing with packages, themes, menus, and the window.
 *  An instance of this class is always available as the atom global.
 */
export interface AtomEnvironment {
    // Properties
    /** A CommandRegistry instance. */
    readonly commands: CommandRegistry;

    /** A Config instance. */
    readonly config: Config;

    /** A Clipboard instance. */
    readonly clipboard: Clipboard;

    /** A ContextMenuManager instance. */
    readonly contextMenu: ContextMenuManager;

    /** A MenuManager instance. */
    readonly menu: MenuManager;

    /** A KeymapManager instance. */
    readonly keymaps: KeymapManager;

    /** A TooltipManager instance. */
    readonly tooltips: TooltipManager;

    /** A NotificationManager instance. */
    readonly notifications: NotificationManager;

    /** A Project instance. */
    readonly project: Project;

    /** A GrammarRegistry instance. */
    readonly grammars: GrammarRegistry;

    /** A HistoryManager instance. */
    readonly history: HistoryManager;

    /** A PackageManager instance. */
    readonly packages: PackageManager;

    /** A ThemeManager instance. */
    readonly themes: ThemeManager;

    /** A StyleManager instance. */
    readonly styles: StyleManager;

    /** A DeserializerManager instance. */
    readonly deserializers: DeserializerManager;

    /** A ViewRegistry instance. */
    readonly views: ViewRegistry;

    /** A Workspace instance. */
    readonly workspace: Workspace;

    /** A TextEditorRegistry instance. */
    readonly textEditors: TextEditorRegistry;

    // Event Subscription
    /** Invoke the given callback whenever ::beep is called. */
    onDidBeep(callback: () => void): Disposable;

    /**
     *  Invoke the given callback when there is an unhandled error, but before
     *  the devtools pop open.
     */
    onWillThrowError(callback: (event: PreventableExceptionThrownEvent) => void): Disposable;

    /** Invoke the given callback whenever there is an unhandled error. */
    onDidThrowError(callback: (event: ExceptionThrownEvent) => void): Disposable;

    /**
     *  Invoke the given callback as soon as the shell environment is loaded (or
     *  immediately if it was already loaded).
     */
    whenShellEnvironmentLoaded(callback: () => void): Disposable;

    // Atom Details
    /** Returns a boolean that is true if the current window is in development mode. */
    inDevMode(): boolean;

    /** Returns a boolean that is true if the current window is in safe mode. */
    inSafeMode(): boolean;

    /** Returns a boolean that is true if the current window is running specs. */
    inSpecMode(): boolean;

    /** Get the full name of this Atom release (e.g. "Atom", "Atom Beta") */
    getAppName(): string;

    /** Get the version of the Atom application. */
    getVersion(): string;

    /**
     *  Gets the release channel of the Atom application.
     *  Returns the release channel, which can be 'dev', 'nightly', 'beta', or 'stable'.
     */
    getReleaseChannel(): "dev"|"nightly"|"beta"|"stable";

    /** Returns a boolean that is true if the current version is an official release. */
    isReleasedVersion(): boolean;

    /** Get the time taken to completely load the current window. */
    getWindowLoadTime(): number;

    /** Get the all the markers with the information about startup time. */
    getStartupMarkers(): TimingMarker[];

    /** Get the load settings for the current window. */
    getLoadSettings(): WindowLoadSettings;

    // Managing the Atom Window
    /** Open a new Atom window using the given options. */
    open(params?: {
        pathsToOpen: ReadonlyArray<string>,
        newWindow?: boolean,
        devMode?: boolean,
        safeMode?: boolean,
    }): void;

    /** Close the current window. */
    close(): void;

    /** Get the size of current window. */
    getSize(): { width: number, height: number };

    /** Set the size of current window. */
    setSize(width: number, height: number): void;

    /** Get the position of current window. */
    getPosition(): { x: number, y: number };

    /** Set the position of current window. */
    setPosition(x: number, y: number): void;

    /** Prompt the user to select one or more folders. */
    pickFolder(callback: (paths: string[]|null) => void): void;

    /** Get the current window. */
    getCurrentWindow(): object;

    /** Move current window to the center of the screen. */
    center(): void;

    /** Focus the current window. */
    focus(): void;

    /** Show the current window. */
    show(): void;

    /** Hide the current window. */
    hide(): void;

    /** Reload the current window. */
    reload(): void;

    /** Relaunch the entire application. */
    restartApplication(): void;

    /** Returns a boolean that is true if the current window is maximized. */
    isMaximized(): boolean;

    /** Returns a boolean that is true if the current window is in full screen mode. */
    isFullScreen(): boolean;

    /** Set the full screen state of the current window. */
    setFullScreen(fullScreen: boolean): void;

    /** Toggle the full screen state of the current window. */
    toggleFullScreen(): void;

    /**
     * Restores the full screen and maximized state after the window has resized to prevent resize
     * glitches.
     */
    displayWindow(): Promise<undefined>;

    /** Get the dimensions of this window. */
    getWindowDimensions(): { x: number, y: number, width: number, height: number };

    /** Set the dimensions of the window. */
    setWindowDimensions(dimensions: {
        x?: number,
        y?: number,
        width?: number,
        height?: number
    }): Promise<object>;

    // Messaging the User
    /** Visually and audibly trigger a beep. */
    beep(): void;

    /**
     *  A flexible way to open a dialog akin to an alert dialog. If a callback
     *  is provided, then the confirmation will work asynchronously, which is
     *  recommended.
     *
     *  If the dialog is closed (via `Esc` key or `X` in the top corner) without
     *  selecting a button the first button will be clicked unless a "Cancel" or "No"
     *  button is provided.
     *
     *  Returns the chosen button index number if the buttons option was an array.
     *  @param response The index of the button that was clicked.
     *  @param checkboxChecked The checked state of the checkbox if `checkboxLabel` was set.
     *  Otherwise false.
     */
    confirm(options: ConfirmationOptions, callback: (response: number,
        checkboxChecked: boolean) => void): void;

    /**
     *  A flexible way to open a dialog akin to an alert dialog. If a callback
     *  is provided, then the confirmation will work asynchronously, which is
     *  recommended.
     *
     *  If the dialog is closed (via `Esc` key or `X` in the top corner) without
     *  selecting a button the first button will be clicked unless a "Cancel" or "No"
     *  button is provided.
     *
     *  Returns the chosen button index number if the buttons option was an array.
     */
    confirm(options: {
        message: string,
        detailedMessage?: string,
        buttons?: ReadonlyArray<string>,
    }): void;

    /**
     *  A flexible way to open a dialog akin to an alert dialog. If a callback
     *  is provided, then the confirmation will work asynchronously, which is
     *  recommended.
     *
     *  If the dialog is closed (via `Esc` key or `X` in the top corner) without
     *  selecting a button the first button will be clicked unless a "Cancel" or "No"
     *  button is provided.
     *
     *  Returns the chosen button index number if the buttons option was an array.
     */
    confirm(options: {
        message: string,
        detailedMessage?: string,
        buttons?: {
            [key: string]: () => void
        },
    }): number;

    // Managing the Dev Tools
    /** Open the dev tools for the current window. */
    openDevTools(): Promise<null>;

    /** Toggle the visibility of the dev tools for the current window. */
    toggleDevTools(): Promise<null>;

    /** Execute code in dev tools. */
    executeJavaScriptInDevTools(code: string): void;

    /** Undocumented: get Atom config directory path */
    getConfigDirPath(): string;
}

export * from "./src/config";

export * from "./src/config-schema";

export * from "./src/color";

export * from "./src/command-registry";

export * from "./dependencies/event-kit";

export * from "./src/decoration";

export * from "./dependencies/text-buffer";

export * from "./src/layer-decoration";

export * from "./src/notification";

export * from "./src/notification-manager";

export * from "./src/text-editor";

export * from "./src/gutter";

export interface PixelPosition {
    left: number;
    top: number;
}

export * from "./src/text-editor-component";

export * from "./src/text-editor-element";

export * from "./src/text-editor-registry";

export * from "./src/tooltip-manager";

export * from "./src/view-registry";

export * from "./src/workspace";

export * from "./src/workspace-center";

export * from "./src/buffered-process";

export * from "./src/buffered-node-process";

export * from "./src/clipboard";

export * from "./src/context-menu-manager";

export * from "./src/menu-manager";

export * from "./src/cursor";

export * from "./src/deserializer-manager";

export * from "./dependencies/pathwatcher";

export * from "./src/dock";

export * from "./src/git-repository";

export * from "./src/history-manager";

export * from "./src/keymap-extensions";

export * from "./src/package";

export * from "./src/package-manager";

export * from "./src/pane";

export * from "./src/panel";

export * from "./src/path-watcher";

export * from "./src/project";

export * from "./src/scope-descriptor";

export * from "./src/selection";

export * from "./src/style-manager";

export * from "./src/task";

export * from "./src/theme-manager";

export * from "./src/grammar-registry";

export * from "./src/tooltip";

// Extended Classes ===========================================================

/** Grammar that tokenizes lines of text. */
export interface Grammar {
    /** The name of the Grammar. */
    readonly name: string;

    /** Undocumented: scope name of the Grammar. */
    readonly scopeName: string;

    // Event Subscription
    onDidUpdate(callback: () => void): Disposable;

    // Tokenizing
    /**
     *  Tokenize all lines in the given text.
     *  @param text A string containing one or more lines.
     *  @return An array of token arrays for each line tokenized.
     */
    tokenizeLines(text: string): GrammarToken[][];

    /**
     *  Tokenizes the line of text.
     *  @param line A string of text to tokenize.
     *  @param ruleStack An optional array of rules previously returned from this
     *  method. This should be null when tokenizing the first line in the file.
     *  @param firstLine A optional boolean denoting whether this is the first line
     *  in the file which defaults to `false`.
     *  @return An object representing the result of the tokenize.
     */
    tokenizeLine(line: string, ruleStack?: null, firstLine?: boolean): TokenizeLineResult;
    /**
     *  Tokenizes the line of text.
     *  @param line A string of text to tokenize.
     *  @param ruleStack An optional array of rules previously returned from this
     *  method. This should be null when tokenizing the first line in the file.
     *  @param firstLine A optional boolean denoting whether this is the first line
     *  in the file which defaults to `false`.
     *  @return An object representing the result of the tokenize.
     */
    tokenizeLine(line: string, ruleStack: GrammarRule[], firstLine?: false):
        TokenizeLineResult;
}

// Events =====================================================================
// The event objects that are passed into the callbacks which the user provides to
// specific API calls.

/**
 *  This custom subclass of CustomEvent exists to provide the ::abortKeyBinding
 *  method, as well as versions of the ::stopPropagation methods that record the
 *  intent to stop propagation so event bubbling can be properly simulated for
 *  detached elements.
 */
export interface CommandEvent<CurrentTarget extends EventTarget = EventTarget> extends CustomEvent {
    keyBindingAborted: boolean;
    propagationStopped: boolean;

    abortKeyBinding(): void;
    stopPropagation(): CustomEvent;
    stopImmediatePropagation(): CustomEvent;
    currentTarget: CurrentTarget;
}

export interface DecorationPropsChangedEvent {
    /** Object the old parameters the decoration used to have. */
    oldProperties: DecorationOptions;

    /** Object the new parameters the decoration now has */
    newProperties: DecorationOptions;
}

export interface EditorChangedEvent {
    /** A Point representing where the change started. */
    start: Point;

    /** A Point representing the replaced extent. */
    oldExtent: Point;

    /** A Point representing the replacement extent. */
    newExtent: Point;
}

export interface ExceptionThrownEvent {
    originalError: Error;
    message: string;
    url: string;
    line: number;
    column: number;
}

export interface FileSavedEvent {
    /** The path to which the buffer was saved. */
    path: string;
}

export interface FilesystemChangeBasic<
  Action extends "created"|"modified"|"deleted"|"renamed"
  = "created"|"modified"|"deleted"
> {
    /** A string describing the filesystem action that occurred. */
    action: Action;

    /** The absolute path to the filesystem entry that was acted upon. */
    path: string;
}

export interface FilesystemChangeRename extends FilesystemChangeBasic<"renamed"> {
    /**
     *  For rename events, a string containing the filesystem entry's former
     *  absolute path.
     */
    oldPath: string;
}

export type FilesystemChange = FilesystemChangeBasic|FilesystemChangeRename;

export type FilesystemChangeEvent = FilesystemChange[];

export interface HandleableErrorEvent {
    /** The error object. */
    error: Error;

    /**
     *  Call this function to indicate you have handled the error.
     *  The error will not be thrown if this function is called.
     */
    handle(): void;
}

export interface PreventableExceptionThrownEvent extends ExceptionThrownEvent {
    preventDefault(): void;
}

export interface TextEditorObservedEvent {
    textEditor: TextEditor;
    pane: Pane;
    index: number;
}

// Extendables ================================================================
// Interfaces which can be augmented in order to provide additional type
// information under certain contexts.

// Options ====================================================================
// The option objects that the user is expected to fill out and provide to
// specific API call.

export interface BuildEnvironmentOptions {
    /**
     *  An object responsible for Atom's interaction with the browser process and host OS.
     *  Use buildDefaultApplicationDelegate for a default instance.
     */
    applicationDelegate?: object;

    /** A window global. */
    window?: Window;

    /** A document global. */
    document?: Document;

    /** A path to the configuration directory (usually ~/.atom). */
    configDirPath?: string;

    /**
     *  A boolean indicating whether the Atom environment should save or load state
     *  from the file system. You probably want this to be false.
     */
    enablePersistence?: boolean;
}

export interface ConfirmationOptions {
    /** The type of the confirmation prompt. */
    type?: "none"|"info"|"error"|"question"|"warning";

    /** The text for the buttons. */
    buttons?: ReadonlyArray<string>;

    /** The index for the button to be selected by default in the prompt. */
    defaultId?: number;

    /** The title for the prompt. */
    title?: string;

    /** The content of the message box. */
    message?: string;

    /** Additional information regarding the message. */
    detail?: string;

    /** If provided, the message box will include a checkbox with the given label. */
    checkboxLabel?: string;

    /** Initial checked state of the checkbox. false by default. */
    checkboxChecked?: boolean;

    /** An Electron NativeImage to use as the prompt's icon. */
    icon?: object;

    /**
     *  The index of the button to be used to cancel the dialog, via the `Esc` key.
     *  By default this is assigned to the first button with "cancel" or "no" as the
     *  label. If no such labeled buttons exist and this option is not set, 0 will be
     *  used as the return value or callback response.
     *
     *  This option is ignored on Windows.
     */
    cancelId?: number;

    /**
     *  On Windows, Electron will try to figure out which one of the buttons are
     *  common buttons (like `Cancel` or `Yes`), and show the others as command links
     *  in the dialog. This can make the dialog appear in the style of modern Windows
     *  apps. If you don't like this behavior, you can set noLink to true.
     */
    noLink?: boolean;

    /**
     * Normalize the keyboard access keys across platforms.
     * Atom defaults this to true.
     */
    normalizeAccessKeys?: boolean;
}

export interface HistoryTransactionOptions {
    /** When provided, skip taking snapshot for other selections markerLayers except given one. */
    selectionsMarkerLayer?: MarkerLayer;
}

export interface HistoryTraversalOptions {
    /** Restore snapshot of selections marker layer to given selectionsMarkerLayer. */
    selectionsMarkerLayer?: MarkerLayer;
}

export interface ReadonlyEditOptions {
    /** Whether the readonly protections on the text editor should be ignored. */
    bypassReadOnly?: boolean;
}

export interface TextEditOptions {
    /** If true, all line endings will be normalized to match the editor's current mode. */
    normalizeLineEndings?: boolean;

    /**
     * If skip, skips the undo stack for this operation.
     * @deprecated Call groupLastChanges() on the TextBuffer afterward instead.
     */
    undo?: "skip";
}

export interface TextInsertionOptions extends TextEditOptions {
    /** If true, selects the newly added text. */
    select?: boolean;

    /** If true, indents all inserted text appropriately. */
    autoIndent?: boolean;

    /** If true, indent newline appropriately. */
    autoIndentNewline?: boolean;

    /**
     *  If true, decreases indent level appropriately (for example, when a closing
     *  bracket is inserted).
     */
    autoDecreaseIndent?: boolean;

    /**
     *  By default, when pasting multiple lines, Atom attempts to preserve the relative
     *  indent level between the first line and trailing lines, even if the indent
     *  level of the first line has changed from the copied text. If this option is
     *  true, this behavior is suppressed.
     */
    preserveTrailingLineIndentation?: boolean;
}

// Interfaces =================================================================
// The requirements placed on object parameters for specific API calls.

/** An interface which all custom test runners should implement. */
export type TestRunner = (params: TestRunnerParams) => Promise<number>;

// Structures =================================================================
// The structures that are passed to the user by Atom following specific API calls.

export interface CancellablePromise<T> extends Promise<T> {
    cancel(): void;
}

export type FileEncoding =
    | "iso88596"       // Arabic (ISO 8859-6)
    | "windows1256"    // Arabic (Windows 1256)
    | "iso88594"       // Baltic (ISO 8859-4)
    | "windows1257"    // Baltic (Windows 1257)
    | "iso885914"      // Celtic (ISO 8859-14)
    | "iso88592"       // Central European (ISO 8859-2)
    | "windows1250"    // Central European (Windows 1250)
    | "gb18030"        // Chinese (GB18030)
    | "gbk"            // Chinese (GBK)
    | "cp950"          // Traditional Chinese (Big5)
    | "big5hkscs"      // Traditional Chinese (Big5-HKSCS)
    | "cp866"          // Cyrillic (CP 866)
    | "iso88595"       // Cyrillic (ISO 8859-5)
    | "koi8r"          // Cyrillic (KOI8-R)
    | "koi8u"          // Cyrillic (KOI8-U)
    | "windows1251"    // Cyrillic (Windows 1251)
    | "cp437"          // DOS (CP 437)
    | "cp850"          // DOS (CP 850)
    | "iso885913"      // Estonian (ISO 8859-13)
    | "iso88597"       // Greek (ISO 8859-7)
    | "windows1253"    // Greek (Windows 1253)
    | "iso88598"       // Hebrew (ISO 8859-8)
    | "windows1255"    // Hebrew (Windows 1255)
    | "cp932"          // Japanese (CP 932)
    | "eucjp"          // Japanese (EUC-JP)
    | "shiftjis"       // Japanese (Shift JIS)
    | "euckr"          // Korean (EUC-KR)
    | "iso885910"      // Nordic (ISO 8859-10)
    | "iso885916"      // Romanian (ISO 8859-16)
    | "iso88599"       // Turkish (ISO 8859-9)
    | "windows1254"    // Turkish (Windows 1254)
    | "utf8"           // Unicode (UTF-8)
    | "utf16le"        // Unicode (UTF-16 LE)
    | "utf16be"        // Unicode (UTF-16 BE)
    | "windows1258"    // Vietnamese (Windows 1258)
    | "iso88591"       // Western (ISO 8859-1)
    | "iso88593"       // Western (ISO 8859-3)
    | "iso885915"      // Western (ISO 8859-15)
    | "macroman"       // Western (Mac Roman)
    | "windows1252";   // Western (Windows 1252)

export interface GrammarRule {
    // https://github.com/atom/first-mate/blob/v7.0.7/src/rule.coffee
    // This is private. Don't go down the rabbit hole.
    rule: object;
    scopeName: string;
    contentScopeName: string;
}

export interface GrammarToken {
    value: string;
    scopes: string[];
}

export interface Invisibles {
    /**
     *  Character used to render newline characters (\n) when the `Show Invisibles`
     *  setting is enabled.
     */
    eol?: boolean|string;

    /**
     *  Character used to render leading and trailing space characters when the
     *  `Show Invisibles` setting is enabled.
     */
    space?: boolean|string;

    /**
     *  Character used to render hard tab characters (\t) when the `Show Invisibles`
     *  setting is enabled.
     */
    tab?: boolean|string;

    /**
     *  Character used to render carriage return characters (for Microsoft-style line
     *  endings) when the `Show Invisibles` setting is enabled.
     */
    cr?: boolean|string;
}

export interface TestRunnerParams {
    /** An array of paths to tests to run. Could be paths to files or directories. */
    testPaths: string[];

    /**
     *  A function that can be called to construct an instance of the atom global.
     *  No atom global will be explicitly assigned, but you can assign one in your
     *  runner if desired.
     */
    buildAtomEnvironment(options: BuildEnvironmentOptions): AtomEnvironment;

    /**
     *  A function that builds a default instance of the application delegate, suitable
     *  to be passed as the applicationDelegate parameter to buildAtomEnvironment.
     */
    buildDefaultApplicationDelegate(): object;

    /** An optional path to a log file to which test output should be logged. */
    logFile: string;

    /**
     *  A boolean indicating whether or not the tests are being run from the command
     *  line via atom --test.
     */
    headless: boolean;
}

export interface TimingMarker {
    label: string;
    time: number;
}

/** Result returned by `Grammar.tokenizeLine`. */
export interface TokenizeLineResult {
    /** The string of text that was tokenized. */
    line: string;

    /**
     *  An array of integer scope ids and strings. Positive ids indicate the
     *  beginning of a scope, and negative tags indicate the end. To resolve ids
     *  to scope names, call GrammarRegistry::scopeForId with the absolute
     *  value of the id.
     */
    tags: Array<number|string>;

    /**
     *  This is a dynamic property. Invoking it will incur additional overhead,
     *  but will automatically translate the `tags` into token objects with `value`
     *  and `scopes` properties.
     */
    tokens: GrammarToken[];

    /**
     *  An array of rules representing the tokenized state at the end of the line.
     *  These should be passed back into this method when tokenizing the next line
     *  in the file.
     */
    ruleStack: GrammarRule[];
}

export interface WindowLoadSettings {
    readonly appVersion: string;
    readonly atomHome: string;
    readonly devMode: boolean;
    readonly resourcePath: string;
    readonly safeMode: boolean;
    readonly env?: { [key: string]: string|undefined };
    readonly profileStartup?: boolean;
}
