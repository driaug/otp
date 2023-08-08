import React, {useRef} from 'react';

export interface OTPProps {
  onComplete: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

/**
 *
 * @param root0
 * @param root0.disabled
 * @param root0.onComplete
 */
export default function OTP({onComplete, disabled, length}: OTPProps) {
  const inputRefs = Array.from({length: length ?? 6}, () => useRef<HTMLInputElement>(null));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      const currentInputIndex = inputRefs.findIndex(ref => ref.current === document.activeElement);

      if (currentInputIndex >= 0) {
        const currentInput = inputRefs[currentInputIndex];

        if (currentInput.current) {
          const currentValue = currentInput.current.value;

          if (currentValue !== '') {
            currentInput.current.value = '';
          }

          if (currentInputIndex > 0) {
            const previousInput = inputRefs[currentInputIndex - 1];
            previousInput.current?.focus();
          }
        }
      }
    }

    if (e.key === 'Delete') {
      e.preventDefault();

      const currentInputIndex = inputRefs.findIndex(ref => ref.current === document.activeElement);

      if (currentInputIndex >= 0) {
        const currentInput = inputRefs[currentInputIndex];

        if (currentInput.current) {
          const currentValue = currentInput.current.value;

          if (currentValue !== '') {
            currentInput.current.value = '';
          }

          if (currentInputIndex < inputRefs.length - 1) {
            const nextInput = inputRefs[currentInputIndex + 1];
            nextInput.current?.focus();
          }
        }
      }
    }
  };

  const handleOnChange = (index: number, value: string) => {
    const newValues = inputRefs.map((ref, i) => (i === index ? value : ref.current?.value ?? ''));
    const otpValue = newValues.join('');

    if (index < inputRefs.length - 1 && value.length === 1) {
      inputRefs[index + 1].current?.focus();
    }

    if (index > 0 && value === '') {
      inputRefs[index - 1].current?.focus();
    }

    if (newValues.every(val => val !== '')) {
      onComplete(otpValue);

      inputRefs[index].current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('text').slice(0, inputRefs.length);

    const otpValue = pastedValue.slice(0, inputRefs.length);
    onComplete(otpValue);

    inputRefs.forEach((ref, index) => {
      const char = pastedValue[index] || '';
      ref.current!.value = char;
      handleOnChange(index, char);
    });
  };

  return (
    <>
      <form className="flex gap-3 w-full items-center justify-center">
        {inputRefs.map((ref, index) => {
          return (
            <div className={'h-16 w-16'}>
              <input
                disabled={disabled}
                ref={ref}
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-neutral-300 text-lg bg-white disabled:bg-neutral-100 transition ease-in-out"
                maxLength={1}
                type="text"
                onKeyDown={handleKeyDown}
                onChange={e => handleOnChange(index, e.target.value)}
                onPaste={e => handlePaste(e)}
              />
            </div>
          );
        })}
      </form>
    </>
  );
}
