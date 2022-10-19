import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const QueuePage: React.FC = () => {

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue__controls}>
        <div className={styles.queue__input}>
          <Input
            type="number"
            isLimitText={true}
            max={4}
            />
          <Button
            text="Добавить"
            />
          <Button
            text="Удалить"
            />
        </div>
        <Button
          text="Очистить"
          />
      </div>
      <div className={styles.circle__container}>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
      </div>
    </SolutionLayout>
  );
};
