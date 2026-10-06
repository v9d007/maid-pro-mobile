/**
 * Runtime Inspector for React Native Architecture & Engine Internals.
 * Provides live diagnostic data for Module 1 verification.
 */

declare const global: {
  nativeFabricUIManager?: unknown;
  __turboModuleProxy?: unknown;
  HermesInternal?: {
    getRuntimeProperties?: () => Record<string, string>;
  };
  _IS_JSI?: boolean;
};

export interface ArchitectureDiagnostics {
  isHermes: boolean;
  hermesBytecodeVersion?: string;
  isFabric: boolean;
  isTurboModules: boolean;
  isNewArchitecture: boolean;
  architectureName: 'New Architecture (Fabric + TurboModules + JSI)' | 'Legacy Bridge Architecture';
  jsEngineName: 'Hermes (AOT Bytecode)' | 'JavaScriptCore / V8';
}

export function getArchitectureDiagnostics(): ArchitectureDiagnostics {
  // Check Hermes Engine: Hermes exposes global.HermesInternal
  const isHermes = typeof global.HermesInternal === 'object' && global.HermesInternal !== null;

  // Check Fabric (New UI Layer): Fabric registers nativeFabricUIManager on the global scope
  const isFabric = Boolean(global.nativeFabricUIManager);

  // Check TurboModules (New Native Module Layer): TurboModules registers __turboModuleProxy via JSI
  const isTurboModules = Boolean(global.__turboModuleProxy);

  // New Architecture is active when Fabric or TurboModules are present
  const isNewArchitecture = isFabric || isTurboModules;

  let hermesBytecodeVersion: string | undefined;
  if (isHermes && typeof global.HermesInternal?.getRuntimeProperties === 'function') {
    try {
      const props = global.HermesInternal.getRuntimeProperties();
      hermesBytecodeVersion = props['Bytecode Version'] || props['OSS Release Version'];
    } catch {
      // Fallback if property lookup fails
    }
  }

  return {
    isHermes,
    hermesBytecodeVersion,
    isFabric,
    isTurboModules,
    isNewArchitecture,
    architectureName: isNewArchitecture
      ? 'New Architecture (Fabric + TurboModules + JSI)'
      : 'Legacy Bridge Architecture',
    jsEngineName: isHermes
      ? 'Hermes (AOT Bytecode)'
      : 'JavaScriptCore / V8',
  };
}
